const request = require('supertest');
const app = require('../../app');

describe('School Integration Tests', () => {
  it('should create a new school', async () => {
    const schoolData = {
      name: 'Test School',
      address: '123 Main St',
      city: 'Testville',
      state: 'TX',
      zip: '12345',
    };
    const response = await request(app).post('/api/schools').send(schoolData);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(schoolData.name);
    expect(response.body.address).toBe(schoolData.address);
    expect(response.body.city).toBe(schoolData.city);
    expect(response.body.state).toBe(schoolData.state);
    expect(response.body.zip).toBe(schoolData.zip);
  });

  it('should get all schools', async () => {
    const response = await request(app).get('/api/schools');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a school by id', async () => {
    const schoolData = {
      name: 'Test School',
      address: '123 Main St',
      city: 'Testville',
      state: 'TX',
      zip: '12345',
    };
    const response = await request(app).post('/api/schools').send(schoolData);
    const schoolId = response.body._id;
    const response2 = await request(app).get(`/api/schools/${schoolId}`);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe(schoolData.name);
    expect(response2.body.address).toBe(schoolData.address);
    expect(response2.body.city).toBe(schoolData.city);
    expect(response2.body.state).toBe(schoolData.state);
    expect(response2.body.zip).toBe(schoolData.zip);
  });

  it('should update a school', async () => {
    const schoolData = {
      name: 'Test School',
      address: '123 Main St',
      city: 'Testville',
      state: 'TX',
      zip: '12345',
    };
    const response = await request(app).post('/api/schools').send(schoolData);
    const schoolId = response.body._id;
    const updatedSchoolData = {
      name: 'Updated School',
      address: '456 Elm St',
      city: 'Updatedville',
      state: 'CA',
      zip: '67890',
    };
    const response2 = await request(app).put(`/api/schools/${schoolId}`).send(updatedSchoolData);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe(updatedSchoolData.name);
    expect(response2.body.address).toBe(updatedSchoolData.address);
    expect(response2.body.city).toBe(updatedSchoolData.city);
    expect(response2.body.state).toBe(updatedSchoolData.state);
    expect(response2.body.zip).toBe(updatedSchoolData.zip);
  });

  it('should delete a school', async () => {
    const schoolData = {
      name: 'Test School',
      address: '123 Main St',
      city: 'Testville',
      state: 'TX',
      zip: '12345',
    };
    const response = await request(app).post('/api/schools').send(schoolData);
    const schoolId = response.body._id;
    const response2 = await request(app).delete(`/api/schools/${schoolId}`);
    expect(response2.status).toBe(200);
    const response3 = await request(app).get(`/api/schools/${schoolId}`);
    expect(response3.status).toBe(404);
  });
});