const School = require('../models/School');

class SchoolManager {
  async getAllSchools() {
    try {
      const schools = await School.find();
      return schools;
    } catch (err) {
      throw err;
    }
  }

  async getSchoolById(id) {
    try {
      const school = await School.findById(id);
      return school;
    } catch (err) {
      throw err;
    }
  }

  async createSchool(schoolData) {
    try {
      const school = new School(schoolData);
      await school.save();
      return school;
    } catch (err) {
      throw err;
    }
  }

  async updateSchool(id, schoolData) {
    try {
      const school = await School.findById(id);
      if (!school) {
        throw new Error('School not found');
      }
      school.set(schoolData);
      await school.save();
      return school;
    } catch (err) {
      throw err;
    }
  }

  async deleteSchool(id) {
    try {
      const school = await School.findById(id);
      if (!school) {
        throw new Error('School not found');
      }
      await school.remove();
      return { message: 'School deleted successfully' };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SchoolManager;