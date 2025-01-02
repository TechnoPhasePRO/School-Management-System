const Student = require('../models/Student');

class StudentManager {
  async getAllStudents() {
    try {
      const students = await Student.find();
      return students;
    } catch (err) {
      throw err;
    }
  }

  async getStudentById(id) {
    try {
      const student = await Student.findById(id);
      return student;
    } catch (err) {
      throw err;
    }
  }

  async createStudent(studentData) {
    try {
      const student = new Student(studentData);
      await student.save();
      return student;
    } catch (err) {
      throw err;
    }
  }

  async updateStudent(id, studentData) {
    try {
      const student = await Student.findById(id);
      if (!student) {
        throw new Error('Student not found');
      }
      student.set(studentData);
      await student.save();
      return student;
    } catch (err) {
      throw err;
    }
  }

  async deleteStudent(id) {
    try {
      const student = await Student.findById(id);
      if (!student) {
        throw new Error('Student not found');
      }
      await student.remove();
      return { message: 'Student deleted successfully' };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = StudentManager;