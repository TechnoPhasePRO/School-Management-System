const request = require('supertest');
const app = require('../../app');

describe('Student-Classroom Integration Tests', () => {
  it('should add a student to a classroom', async () => {
    const classroomData = {
      name: 'Test Classroom',
      capacity: 20,
    };
    const response = await request(app).post('/api/classrooms').send(classroomData);
    const classroomId = response.body._id;
    const studentData = {
      name: 'Test Student',
      email: 'test@student.com',
    };
    const response2 = await request(app).post('/api/students').send(studentData);
    const studentId = response2.body._id;
    const response3 = await request(app).put(`/api/classrooms/${classroomId}/students/${studentId}`);
    expect(response3.status).toBe(200);
    expect(response3.body.students).toContainEqual(studentId);
  });

  it('should remove a student from a classroom', async () => {
    const classroomData = {
      name: 'Test Classroom',
      capacity: 20,
    };
    const response = await request(app).post('/api/classrooms').send(classroomData);
    const classroomId = response.body._id;
    const studentData = {
      name: 'Test Student',
      email: 'test@student.com',
    };
    const response2 = await request(app).post('/api/students').send(studentData);
    const studentId = response2.body._id;
    const response3 = await request(app).put(`/api/classrooms/${classroomId}/students/${studentId}`);
    expect(response3.status).toBe(200);
    expect(response3.body.students).toContainEqual(studentId);
    const response4 = await request(app).delete(`/api/classrooms/${classroomId}/students/${studentId}`);
    expect(response4.status).toBe(200);
    expect(response4.body.students).not.toContainEqual(studentId);
  });

  it('should get all students in a classroom', async () => {
    const classroomData = {
      name: 'Test Classroom',
      capacity: 20,
    };
    const response = await request(app).post('/api/classrooms').send(classroomData);
    const classroomId = response.body._id;
    const studentData1 = {
      name: 'Test Student 1',
      email: 'test1@student.com',
    };
    const response2 = await request(app).post('/api/students').send(studentData1);
    const studentId1 = response2.body._id;
    const studentData2 = {
      name: 'Test Student 2',
      email: 'test2@student.com',
    };
    const response3 = await request(app).post('/api/students').send(studentData2);
    const studentId2 = response3.body._id;
    const response4 = await request(app).put(`/api/classrooms/${classroomId}/students/${studentId1}`);
    expect(response4.status).toBe(200);
    expect(response4.body.students).toContainEqual(studentId1);
    const response5 = await request(app).put(`/api/classrooms/${classroomId}/students/${studentId2}`);
    expect(response5.status).toBe(200);
    expect(response5.body.students).toContainEqual(studentId2);
    const response6 = await request(app).get(`/api/classrooms/${classroomId}/students`);
    expect(response6.status).toBe(200);
    expect(response6.body).toContainEqual(studentId1);
    expect(response6.body).toContainEqual(studentId2);
  });
});