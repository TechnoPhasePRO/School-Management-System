const SchoolManager = require('../managers/SchoolManager');
const ClassroomManager = require('../managers/ClassroomManager');
const StudentManager = require('../managers/StudentManager');

class ManagersLoader {
  constructor(options) {
    this.options = options;
  }

  load() {
    return {
      SchoolManager: new SchoolManager(this.options),
      ClassroomManager: new ClassroomManager(this.options),
      StudentManager: new StudentManager(this.options)
    };
  }
}

module.exports = ManagersLoader;