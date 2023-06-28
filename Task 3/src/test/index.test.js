const supertest = require('supertest');
const app = require('../../index');
const request = require('supertest');


describe("testing the response of API",()=>{
  
    it('should return Home text', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('CRUD with mysql');
    });

    it('should return the user ', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.text).toBe('User fetched');
    });

    it('when non existent id is given', async () => {
        const response = await request(app).get('/users/97');
        expect(response.status).toBe(200);
        expect(response.text).toBe('User fetched based on id');
    });   
})

 
 
