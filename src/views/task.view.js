const taskController = require('../controllers/task.controller');
const { createAddForm } = require('./shared/addForm');

const loadTasks = () => {
  const taskContainer = document.querySelector('.task__container');
  const taskBody = document.querySelector('.task__body');

  if (!taskBody || !taskContainer) {
    console.log('need task__body and task__container class for container');
    return;
  }
  taskBody.textContent = '';

  let taskDatas = null;
  let { filterName, filterValue } = taskContainer.dataset;
  if (!filterName || filterValue === undefined)
    taskDatas = taskController.getTasks();
  if (filterName === 'isDone') {
    if (filterValue.toLowerCase() === 'true') {
      filterValue = true;
    } else {
      filterValue = false;
    }
  }
  // filters
  let filter = { [filterName]: filterValue };

  // filter based projects
  if (filterName === 'project') filter = { project: { id: filterValue } };

  taskDatas = taskController.getTasks(filter);

  taskDatas.forEach((taskData) => {
    const task = createTask(taskData);
    taskBody.append(task);
  });
};

exports.loadTaskContainer = ({
  type = null,
  projectId = null,
  filterName,
  filterValue,
}) => {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task__container');
  taskContainer.setAttribute('data-task-container-type', type);
  if (filterName) taskContainer.setAttribute('data-filter-name', filterName);
  if (filterValue) taskContainer.setAttribute('data-filter-value', filterValue);

  const taskBody = document.createElement('div');
  taskBody.classList.add('task__body');

  const taskFooter = document.createElement('div');
  taskFooter.classList.add('task__footer');

  // try to append to body; for dev purpose
  const bodyClass = document.querySelector('.body');
  bodyClass.textContent = '';

  // append addform if the type of container is project
  if (type === 'project') {
    const addEvent = function (e) {
      // take input
      const taskTitle = e.target
        .closest('.add-form')
        .querySelector('.add-form__title').value;

      // create task to backend
      taskController.createTask({ title: taskTitle, project: filterValue });

      // redraw ui
      loadTasks();
    };
    const addForm = createAddForm({ addPlaceholder: 'Todo', addEvent });
    taskFooter.append(addForm);
  }
  taskContainer.append(taskBody);
  taskContainer.append(taskFooter);
  bodyClass.append(taskContainer);

  loadTasks();
  return taskContainer;
};

const createTaskContainer = () => {};
const createTask = (taskData) => {
  const task = document.createElement('div');
  task.classList.add('task');
  task.setAttribute('data-key', taskData.id);

  // check input
  const checkInput = document.createElement('input');
  checkInput.type = 'checkbox';
  checkInput.checked = taskData.isDone;
  checkInput.addEventListener('input', function () {
    taskController.updateTask(taskData.id, { isDone: this.checked });
  });
  task.append(checkInput);

  // title
  const taskTitle = document.createElement('p');
  taskTitle.classList.add('task__title');
  taskTitle.textContent = taskData.title;
  task.append(taskTitle);

  // set project title
  if (taskData.project?.title) {
    const taskProject = document.createElement('span');
    taskProject.classList.add('text--mute');
    taskProject.textContent = taskData.project.title;
    task.append(taskProject);
  }

  // duedate
  const dueDate = document.createElement('input');
  dueDate.classList.add('task__due-date');
  dueDate.type = 'date';
  if (taskData.dueDate) {
    dueDate.value = taskData.dueDate.toISOString().substring(0, 10);
  }
  dueDate.addEventListener('input', function () {
    const dueDate = this.value;
    taskController.updateTask(taskData.id, { dueDate: new Date(dueDate) });
    loadTasks();
  });

  task.append(dueDate);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add(...['btn']);
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', function () {
    console.log('deleted');
    taskController.deleteTask(taskData.id);
    loadTasks();
  });
  task.append(deleteButton);

  return task;
};
