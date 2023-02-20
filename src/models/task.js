const { Schema, Model } = require('./model');
const Project = require('./project');
class Task extends Schema {
  constructor({ title, isDone = false, project = null, dueDate = null }) {
    super();
    this.isDone = isDone;
    this.title = title;
    this.project = project;
    this.dueDate = dueDate;
  }
}

class TaskModel extends Model {
  constructor() {
    super();
  }
  create(taskData) {
    let project = Project.findById(taskData.project);

    const task = new Task({ ...taskData, project });
    this.items.ids.push(task.id);
    this.items.data[task.id] = task;
    return this.items.data[task.id];
  }
}

module.exports = new TaskModel();
