const { Schema, Model } = require('./model');

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
    const task = new Task(taskData);
    this.items.ids.push(task.id);
    this.items.data[task.id] = task;
    return this.items.data[task.id];
  }
}

module.exports = new TaskModel();
