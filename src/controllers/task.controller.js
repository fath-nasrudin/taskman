const Task = require('../models/task');

const taskController = {
  getTasks(filter) {
    const tasks = Task.find(filter);
    return tasks;
  },

  getTaskById(taskId) {
    const task = Task.findById(taskId);
  },

  // create task
  createTask(taskData) {
    Task.create(taskData);
  },

  // update task
  updateTask(taskId, taskData) {
    const updatedTask = Task.update(taskId, taskData);
  },

  deleteTask(taskId) {
    Task.remove(taskId);
  },
};

// taskController.createTask({ title: 'Doing programming' });
// taskController.createTask({ title: 'Doing programming' });
// const taskId = Task.find()[0].id;
// taskController.updateTask(taskId, { title: 'Doing Shit' });
// console.log(Task.find({ title: 'Doing Shit' }));
module.exports = taskController;
