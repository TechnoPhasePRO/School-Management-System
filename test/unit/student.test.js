const mongoose = require('mongoose');
const Student = require('../../models/Student');
const School = require('../../models/School');
const Classroom = require('../../models/Classroom');

describe('Student', () => {
  let school, classroom;

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

    classroom = new Classroom({
      name: 'Test Classroom',
      capacity: 30,
      resources: ['Whiteboard', 'Projector'],
      schoolId: school._id,
    });
    await classroom.save();
  });

  afterEach(async () => {
    await Student.deleteMany();
  });

  afterAll(async () => {
    await Classroom.deleteMany();
    await School.deleteMany();
    await mongoose.connection.close();
  });

  it('should create a new student', async () => {
    const student = new Student({
      name: 'Test Student',
      email: 'test@example.com',
      phone: '555-1234',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
      schoolId: school._id,
      classroomId: classroom._id,
    });

    await student.save();

    expect(student.name).toBe('Test Student');
    expect(student.email).toBe('test@example.com');
    expect(student.phone).toBe('555-1234');
    expect(student.address).toBe('123 Main St');
    expect(student.schoolId.toString()).toBe(school._id.toString());
    expect(student.classroomId.toString()).toBe(classroom._id.toString());
  });

  it('should not create a student with missing required fields', async () => {
    const student = new Student({
      name: 'Test Student',
      email: 'test@example.com',
    });

    await expect(student.save()).rejects.toThrow('ValidationError');
  });

  it('should not create a student with duplicate name', async () => {
    const student1 = new Student({
      name: 'Test Student',
      email: 'test@example.com',
      schoolId: school._id,
      classroomId: classroom._id,
    });
    await student1.save();

    const student2 = new Student({
      name: 'Test Student',
      email: 'test2@example.com',
      schoolId: school._id,
      classroomId: classroom._id,
    });

    await expect(student2.save()).rejects.toThrow('E11000');
  });
});
