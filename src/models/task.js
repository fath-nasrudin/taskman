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
const STORAGE_NAME = 'tasks';
if (typeof Storage !== 'undefined') {
  if (!localStorage.getItem(STORAGE_NAME)) {
    localStorage.setItem(
      STORAGE_NAME,
      JSON.stringify({
        ids: [],
        data: {},
      })
    );
  }
} else {
  console.log('No support storage');
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

if (typeof Storage !== 'undefined') {
  TaskModel.prototype.read = function () {
    let parsedData = JSON.parse(localStorage.getItem(STORAGE_NAME));
    parsedData.ids.map((id) => {
      parsedData.data[id] = new Task(parsedData.data[id]);
    });
    return parsedData;
  };

  TaskModel.prototype.write = function (data) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
  };
}

module.exports = new TaskModel();
