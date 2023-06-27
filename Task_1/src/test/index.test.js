const supertest = require('supertest');
const app = require('../../index');
const request = require('supertest');


describe("testing the response of API",()=>{
  
    it('should return Home text', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Home');
      });

    it('should return the user list which is 5', async () => {
        const response = await request(app).get('/getUser');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(5);
      });

      it('when non existent id is given', async () => {
        const response = await request(app).get('/getUser/97');
        expect(response.status).toBe(200);
        expect(response.text).toBe('No user with that id');
       });

      it('should return the user based on the ID', async () => {
        const response = await request(app).get('/getUser/3');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          "id":3,
          "firstName":"Mark",
          "lastName":"Lee",
          "mobileNumber":"9876554323",
          "gender":"M",
          "email":"mark@gmail.com",
          "country":"Canada"
      });
      });
    
})

 
 
