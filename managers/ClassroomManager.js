const Classroom = require('../models/Classroom');

class ClassroomManager {
  async getAllClassrooms() {
    try {
      const classrooms = await Classroom.find();
      return classrooms;
    } catch (err) {
      throw err;
    }
  }

  async getClassroomById(id) {
    try {
      const classroom = await Classroom.findById(id);
      return classroom;
    } catch (err) {
      throw err;
    }
  }

  async createClassroom(classroomData) {
    try {
      const classroom = new Classroom(classroomData);
      await classroom.save();
      return classroom;
    } catch (err) {
      throw err;
    }
  }

  async updateClassroom(id, classroomData) {
    try {
      const classroom = await Classroom.findById(id);
      if (!classroom) {
        throw new Error('Classroom not found');
      }
      classroom.set(classroomData);
      await classroom.save();
      return classroom;
    } catch (err) {
      throw err;
    }
  }

  async deleteClassroom(id) {
    try {
      const classroom = await Classroom.findById(id);
      if (!classroom) {
        throw new Error('Classroom not found');
      }
      await classroom.remove();
      return { message: 'Classroom deleted successfully' };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ClassroomManager;