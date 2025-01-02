const request = require('supertest');
const app = require('../../app');

describe('Student Integration Tests', () => {
  it('should create a new student', async () => {
    const studentData = {
      name: 'Test Student',
      email: 'test@student.com',
    };
    const response = await request(app).post('/api/students').send(studentData);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(studentData.name);
    expect(response.body.email).toBe(studentData.email);
  });

  it('should get all students', async () => {
    const response = await request(app).get('/api/students');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a student by id', async () => {
    const studentData = {
      name: 'Test Student',
      email: 'test@student.com',
    };
    const response = await request(app).post('/api/students').send(studentData);
    const studentId = response.body._id;
    const response2 = await request(app).get(`/api/students/${studentId}`);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe(studentData.name);
    expect(response2.body.email).toBe(studentData.email);
  });

  it('should update a student', async () => {
    const studentData = {
      name: 'Test Student',
      email: 'test@student.com',
    };
    const response = await request(app).post('/api/students').send(studentData);
    const studentId = response.body._id;
    const updatedStudentData = {
      name: 'Updated Student',
      email: 'updated@student.com',
    };
    const response2 = await request(app).put(`/api/students/${studentId}`).send(updatedStudentData);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe(updatedStudentData.name);
    expect(response2.body.email).toBe(updatedStudentData.email);
  });

  it('should delete a student', async () => {
    const studentData = {
      name: 'Test Student',
      email: 'test@student.com',
    };
    const response = await request(app).post('/api/students').send(studentData);
    const studentId = response.body._id;
    const response2 = await request(app).delete(`/api/students/${studentId}`);
    expect(response2.status).toBe(200);
    const response3 = await request(app).get(`/api/students/${studentId}`);
    expect(response3.status).toBe(404);
  });
});