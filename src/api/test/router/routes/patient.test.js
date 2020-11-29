const supertest = require('supertest');
const app = require('../../../');

describe("Testing the api", () => {

	it("Test that patients GET endpoint returns 200 status", async () => {
		const response = await supertest(app).get('/patients');
        expect(response.status).toBe(200);
    })

    it("Test that POST endpoint accepts list of patients", async () => {
        const config = await app.db.configuration.create({ "unitType": "vaccine" })
        const sourceFile = await app.db.sourceFile.create({ "name": "chetan patel", "configurationId": config.dataValues.id })
       
        const patientBody = [{"configurationId": config.dataValues.id, "sourceFileId": sourceFile.dataValues.id, "name": "jack", "is_clinical_trial_participant": true, "sofa_score": 10, "county_of_residence": "Suffolk County"}]

		const response = await supertest(app).post('/patients').send(patientBody);
        expect(response.status).toBe(201);
    });
});