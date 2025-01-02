const mongoose = require('mongoose');
const Classroom = require('../../models/Classroom');
const School = require('../../models/School');

describe('Classroom', () => {
  let school;

  beforeAll(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/test');
    } catch (error) {
      console.error('Error connecting to database:', error);
    }

    school = new School({
      name: 'Test School',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    });
    await school.save();
  });

  afterEach(async () => {
    await Classroom.deleteMany();
  });

  afterAll(async () => {
    await School.deleteMany();
    await mongoose.connection.close();
  });

  it('should create a new classroom', async () => {
    const classroom = new Classroom({
      name: 'Test Classroom',
      capacity: 30,
      resources: ['Whiteboard', 'Projector'],
      schoolId: school._id,
    });

    await classroom.save();

    expect(classroom.name).toBe('Test Classroom');
    expect(classroom.capacity).toBe(30);
    expect(classroom.resources).toEqual(['Whiteboard', 'Projector']);
    expect(classroom.schoolId.toString()).toBe(school._id.toString());
  });

  it('should not create a new classroom with missing required fields', async () => {
    const classroom = new Classroom({
      name: 'Test Classroom',
      capacity: 30,
      resources: ['Whiteboard', 'Projector'],
    });

    await expect(classroom.save()).rejects.toThrow('ValidationError');
  });

  it('should not create a new classroom with duplicate name', async () => {
    const classroom1 = new Classroom({
      name: 'Test Classroom',
      capacity: 30,
      resources: ['Whiteboard', 'Projector'],
      schoolId: school._id,
    });
    await classroom1.save();

    const classroom2 = new Classroom({
      name: 'Test Classroom',
      capacity: 40,
      resources: ['Whiteboard', 'Projector'],
      schoolId: school._id,
    });

    await expect(classroom2.save()).rejects.toThrow('E11000');
  });
});
