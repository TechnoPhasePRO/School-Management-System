const request = require('supertest');
const app = require('../../app');
const User = require('../../models/User');

describe('Authorization Tests', () => {
  let superadminToken;
  let schoolAdminToken;

  beforeAll(async () => {
    const superadmin = new User({ name: 'Superadmin', email: 'superadmin@test.com', password: 'password', role: 'superadmin' });
    await superadmin.save();
    superadminToken = await superadmin.generateAuthToken();

    const schoolAdmin = new User({ name: 'School Admin', email: 'schooladmin@test.com', password: 'password', role: 'school-admin' });
    await schoolAdmin.save();
    schoolAdminToken = await schoolAdmin.generateAuthToken();
  });

  it('should allow superadmin to create a school', async () => {
    const response = await request(app)
      .post('/api/schools')
      .set('Authorization', `Bearer ${superadminToken}`)
      .send({ name: 'Test School', address: '123 Main St' });

    expect(response.status).toBe(201);
  });

  it('should deny school-admin from creating a school', async () => {
    const response = await request(app)
      .post('/api/schools')
      .set('Authorization', `Bearer ${schoolAdminToken}`)
      .send({ name: 'Test School', address: '123 Main St' });

    expect(response.status).toBe(403);
  });
});
