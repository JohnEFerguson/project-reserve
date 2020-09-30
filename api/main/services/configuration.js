'use strict'

function getFieldNames(req, configurationId) {

    return db.reserveCategory.find({ where: { configurationId: configurationId } })
}