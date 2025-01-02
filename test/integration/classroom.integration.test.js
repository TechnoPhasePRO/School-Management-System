const request = require('supertest');
const app = require('../../app');

describe('Classroom Integration Tests', () => {
  it('should create a new classroom', async () => {
    const classroomData = {
      name: 'Test Classroom',
      capacity: 20,
    };
    const response = await request(app).post('/api/classrooms').send(classroomData);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(classroomData.name);
    expect(response.body.capacity).toBe(classroomData.capacity);
  });

  it('should get all classrooms', async () => {
    const response = await request(app).get('/api/classrooms');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a classroom by id', async () => {
    const classroomData = {
      name: 'Test Classroom',
      capacity: 20,
    };
    const response = await request(app).post('/api/classrooms').send(classroomData);
    const classroomId = response.body._id;
    const response2 = await request(app).get(`/api/classrooms/${classroomId}`);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe(classroomData.name);
    expect(response2.body.capacity).toBe(classroomData.capacity);
  });

  it('should update a classroom', async () => {
    const classroomData = {
      name: 'Test Classroom',
      capacity: 20,
    };
    const response = await request(app).post('/api/classrooms').send(classroomData);
    const classroomId = response.body._id;
    const updatedClassroomData = {
      name: 'Updated Classroom',
      capacity: 30,
    };
    const response2 = await request(app).put(`/api/classrooms/${classroomId}`).send(updatedClassroomData);
    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe(updatedClassroomData.name);
    expect(response2.body.capacity).toBe(updatedClassroomData.capacity);
  });

  it('should delete a classroom', async () => {
    const classroomData = {
      name: 'Test Classroom',
      capacity: 20,
    };
    const response = await request(app).post('/api/classrooms').send(classroomData);
    const classroomId = response.body._id;
    const response2 = await request(app).delete(`/api/classrooms/${classroomId}`);
    expect(response2.status).toBe(200);
    const response3 = await request(app).get(`/api/classrooms/${classroomId}`);
    expect(response3.status).toBe(404);
  });
});