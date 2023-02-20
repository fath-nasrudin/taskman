const Task = require('../models/task');
const { differenceInCalendarDays } = require('date-fns');

const taskController = {
  getTasks(filter = {}) {
    const { dueDate, ...filter2 } = filter;
    let tasks = Task.find(filter2);

    // filter due date
    if (Number(dueDate) >= 0) {
      tasks = tasks.filter((task) => {
        if (task.dueDate) {
          const diff = differenceInCalendarDays(task.dueDate, new Date());
          if (diff >= 0 && diff <= dueDate) {
            return task;
          }
        }
      });
    }
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
  deleteMany({ filter }) {
    Task.removeMany({ filter });
  },
};

// taskController.createTask({ title: 'Doing programming' });
// taskController.createTask({ title: 'Doing programming' });
// const taskId = Task.find()[0].id;
// taskController.updateTask(taskId, { title: 'Doing Shit' });
// console.log(Task.find({ title: 'Doing Shit' }));
module.exports = taskController;
