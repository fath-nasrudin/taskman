const { Schema, Model } = require('./model');

class Project extends Schema {
  constructor({ id, title, createdAt, updatedAt }) {
    super({ id, createdAt, updatedAt });
    this.title = title;
  }
}

const tempStorage = {
  ids: [],
  data: {},
};
const STORAGE_NAME = 'projects';
if (typeof Storage !== 'undefined') {
  if (!localStorage.getItem(STORAGE_NAME)) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(tempStorage));
  }
} else {
  console.log('No support storage');
}

class ProjectModel extends Model {
  constructor() {
    super();
    this.items = tempStorage;
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

if (typeof Storage !== 'undefined') {
  ProjectModel.prototype.read = function () {
    const data = localStorage.getItem(STORAGE_NAME);
    let parsedData = JSON.parse(data);
    parsedData.ids.map((id) => {
      parsedData.data[id] = new Project(parsedData.data[id]);
    });
    return parsedData;
  };

  ProjectModel.prototype.write = function (data) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
  };
}

module.exports = new ProjectModel();
