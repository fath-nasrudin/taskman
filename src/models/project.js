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
    const items = this.read();
    const task = new Project(taskData);
    items.ids.push(task.id);
    items.data[task.id] = task;
    this.write(items);
    return items.data[task.id];
  }
}

module.exports = new ProjectModel();
