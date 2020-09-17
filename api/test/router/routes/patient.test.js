const supertest = require('supertest');
const app = require('../../../');

describe("Testing the api", () => {

	it("tests the base route and returns true for status", async () => {
		const response = await supertest(app).get('/patients');
        expect(response.status).toBe(200);
    });
});
