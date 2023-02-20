const { Schema, Model } = require('./model');

class Project extends Schema {
  constructor({ title }) {
    super();
    this.title = title;
  }
}

const projectStorage = {
  ids: [],
  data: {},
};
class ProjectModel extends Model {
  constructor() {
    super();
    this.items = projectStorage;
  }
  create(taskData) {
    const task = new Project(taskData);
    this.items.ids.push(task.id);
    this.items.data[task.id] = task;
    return this.items.data[task.id];
  }
}

module.exports = new ProjectModel();
