const { Schema, Model } = require('./model');

class Project extends Schema {
  constructor({ title }) {
    super();
    this.title = title;
  }
}

class ProjectModel extends Model {
  constructor() {
    super();
  }
  create(taskData) {
    const task = new Project(taskData);
    this.items.ids.push(task.id);
    this.items.data[task.id] = task;
    return this.items.data[task.id];
  }
}

module.exports = new ProjectModel();
