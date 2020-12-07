"use strict";

const { Router } = require("express");
const { SELECT } = require("sequelize");

const router = Router();

// GET all configurations
router.get("/configurations", async (req, res) => {
  const { db } = req;

  return res.json(await db.configuration.findAll({ order: ["id"] }));
});

// GET one configuration by id
router.get("/configurations/:id", async (req, res) => {
  const { db } = req;

  const id = req.params.id;
  return res.json(
    await db.configuration.findOne({
      where: { id },
      include: [
        {
          model: db.reserveCategory,
          as: "reserveCategories",
          order: [['reserveCatetories.`order`', 'ASC']],
          include: [
            {
              model: db.priority,
              include: [
                {
                  model: db.categoryCriteria,
                  as: "categoryCriteria",
                  order: [['order', 'ASC']],
                  include: [
                    {
                      model: db.categoryCriteriaElement,
                      as: "elements",
                    },
                  ],
                },
                {
                  model: db.numericCriteria,
                  as: "numericCriteria",
                  order: [['order', 'ASC']],
                  include: [
                    {
                      model: db.numericCriteriaBucket,
                      as: "bins",
                    },
                  ],
                },
              ],
            },
          ],

        },
      ],
    })
  );
});

// DELETE one configuration by id
router.delete("/configurations/:id", async (req, res) => {
  const { db } = req;

  const id = req.params.id;
  await db.configuration.destroy({ where: { id } });
  return res.status(200).json();
});

// POST single configuration
router.post("/configurations", async (req, res) => {
  const { db } = req;
  try {
    const newConfig = await db.configuration.create(req.body, {
      include: {
        association: db.configuration.reserveCategories,
        include: {
          association: db.reserveCategory.priority,
          include: [
            {
              association: db.priority.categoryCriteria,
              include: db.categoryCriteria.categoryCriteriaElement,
            },
            {
              association: db.priority.numericCriteria,
              include: db.numericCriteria.numericCriteriaBucket,
            },
          ],
        },
      },
    });

    return res.status(201).json(newConfig.dataValues);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Get field names for template CSV
router.get("/configurations/:id/fieldNames", async (req, res) => {
  const { db } = req;

  const configurationId = req.params.id;

  const reserveCategoryNames = await db.reserveCategory.findAll({
    attributes: ["name"],
    where: { configurationId, isDefault: false },
  });

  const categoryCriteriaFields = await db.sequelize.query(
    `
    SELECT id, name FROM category_criteria 
    WHERE priority_id IN (
      SELECT id FROM priority 
      WHERE reserve_category_id in (SELECT id FROM reserve_category WHERE configuration_id = ${configurationId})
    );
    `,
    { type: SELECT }
  );


  const possibleValues = await Promise.all(categoryCriteriaFields[0].map(async (criteria) => {
    const values = await db.sequelize.query(
      `
      select cce.name 
      from category_criteria cc 
      inner join category_criteria_element cce 
      on cc.id = cce.category_criterium_id 
      where cce.category_criterium_id = ${criteria.id}
    `,
      { type: SELECT })
    return {
      criteriaId: criteria.id,
      values: values[0].map((r) => r.name)
    }
  }))

  const possibleValuesMap = possibleValues.reduce((map, valueObj) => {
    map[valueObj.criteriaId] = valueObj.values
    return map
  }, {})


  const numericCriteriaFields = await db.sequelize.query(
    `
    SELECT name, min, max FROM numeric_criteria 
    WHERE priority_id IN (
      SELECT id FROM priority 
      WHERE reserve_category_id in (SELECT id FROM reserve_category WHERE configuration_id = ${configurationId})
    );
    `,
    { type: SELECT }
  );

  const names = new Set()

  const fieldNames = [
    { name: "recipient_id", required: true, dataType: "STRING" },
  ];
  reserveCategoryNames.forEach((cat) => {
    if (!names.has(cat.name)) {
      fieldNames.push({
        name: "is_" + cat.name.toLowerCase().split(" ").join("_"),
        required: true,
        dataType: "BOOLEAN",
      })
      names.add(cat.name)
    }
  });
  categoryCriteriaFields[0].forEach((criteria) => {
    if (!names.has(criteria.name)) {
      fieldNames.push({
        name: criteria.name.toLowerCase().split(" ").join("_"),
        required: false,
        dataType: "STRING",
        possibleValues: possibleValuesMap[criteria.id]
      })
      names.add(criteria.name)
    }
  });
  numericCriteriaFields[0].forEach((criteria) => {
    if (!names.has(criteria.name)) {
      fieldNames.push({
        name: criteria.name.toLowerCase().split(" ").join("_"),
        required: false,
        dataType: "NUMBER",
        possibleValues: { min: criteria.min, max: criteria.max }
      })
      names.add(criteria.name)
    }
  });

  res.json(fieldNames);
});

module.exports = router;
