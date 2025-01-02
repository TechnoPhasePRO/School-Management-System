const mongoose = require('mongoose');
const School = require('../../models/School');

describe('School', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/test');
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  });

  afterEach(async () => {
    await School.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new school', async () => {
    const school = new School({
      name: 'Test School',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    });

    await school.save();

    expect(school.name).toBe('Test School');
    expect(school.address).toBe('123 Main St');
    expect(school.city).toBe('Anytown');
    expect(school.state).toBe('CA');
    expect(school.zip).toBe('12345');
    expect(school.country).toBe('USA');
  });

  it('should not create a new school with missing required fields', async () => {
    const school = new School({
      name: 'Test School',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    });

    await expect(school.save()).rejects.toThrow('ValidationError');
  });

  it('should not create a new school with duplicate name', async () => {
    const school1 = new School({
      name: 'Test School',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    });
    await school1.save();

    const school2 = new School({
      name: 'Test School',
      address: '456 Elm St',
      city: 'Othertown',
      state: 'NY',
      zip: '67890',
      country: 'USA',
    });

    await expect(school2.save()).rejects.toThrow('E11000');
  });
});
