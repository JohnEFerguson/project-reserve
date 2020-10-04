const supertest = require('supertest');
const app = require('../../../');
var assert = require('assert');


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



describe("Testing positive cases for the configuration endpoints", () => {

	it("POSTs a configuration object", async () => {
		const response = await supertest(app).post('/configurations').send(configJson).expect(201);
    });

    it("GET field names from config object by id", async () => {
        const response2 = await supertest(app).get('/configurations/1/fieldNames').expect(200)
        assert(response2.text == '["recipient_id","is_clinical_trial_participant","county_of_residence","sofa_score"]')
    
    });
});