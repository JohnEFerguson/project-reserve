const supertest = require('supertest');
const app = require('../../../');


describe("Testing the configuration routes", () => {

	it("POSTs a configuration object", async () => {

        const configJson = {
            "unitType": "vaccine",
            "supply": 100,
            "reserveCategories": [
                {
                    "name": "clinical trial participant",
                    "description": "A clinical trial participant is defined as anyone who...",
                    "size": 15,
                    "order": 1,
                    "priority": {
                        "categoryCriteria": [
                            {
                                "name": "county_of_residence",
                                "order": 1,
                                "elements": [
                                    {
                                        "name": "Middlesex Country",
                                        "order": 1
                                    },
                                    {
                                        "name": "Suffolk County",
                                        "order": 2
                                    }
                                ]
                            }
                        ],
                        "numericCriteria": [
                            {
                                "name": "sofa_score",
                                "max": 24,
                                "min": 1,
                                "order": "desc",
                                "coarsened": true,
                                "numBins": 3,
                                "bins": [
                                    {
                                        "min": 20,
                                        "max": 24 
                                    },
                                    {
                                        "min": 10,
                                        "max": 20
                                    },
                                    {
                                        "min": 1,
                                        "max": 10
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }

		const response = await supertest(app).post('/configurations').send(configJson).expect(201);
    });
});
