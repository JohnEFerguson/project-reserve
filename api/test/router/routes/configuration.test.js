const supertest = require('supertest');
const app = require('../../../');
var assert = require('assert');


const configJson = {
    "unitType": "vaccine",
    "supply": 100,
    "reserveCategories": [
        {
            "name": "clinical trial participant",
            "isDefault": false,
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
        },
        {
            "name":"Unreserved (auto-populated)",
            "isDefault": true,
            "description":"Default reserve category",
            "size":"120",
            "order": 2,
            "priority":{
               "categoryCriteria":[],
               "numericCriteria":[]
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
        console.log(response2.text)
        assert(response2.text == '[{"name":"recipient_id","required":true},{"name":"is_clinical_trial_participant","required":true},{"name":"county_of_residence","required":false},{"name":"sofa_score","required":false}]')
    
    });
});