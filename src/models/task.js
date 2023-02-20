const { Schema, Model } = require('./model');
const Project = require('./project');
class Task extends Schema {
  constructor({
    id,
    title = 'untitled',
    isDone = false,
    project = null,
    dueDate = null,
    createdAt,
    updatedAt,
  }) {
    super({ id, createdAt, updatedAt });

    this.isDone = isDone;
    this.title = title;
    this.project = project;
    this.dueDate = dueDate ? new Date(dueDate) : null;
  }
}

class TaskModel extends Model {
  constructor() {
    super();
  }
  create(taskData) {
    let project = Project.findById(taskData.project);
    const items = this.read();
    const task = new Task({ ...taskData, project });
    items.ids.push(task.id);
    items.data[task.id] = task;

    this.write(items);
    return items.data[task.id];
  }
}

module.exports = new TaskModel();
