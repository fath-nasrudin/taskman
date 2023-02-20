const projectController = require('../controllers/project.controller');
const { createAddForm } = require('./shared/addForm');
const {
  createDatalistContainer,
  createDatalistHeader,
  createDatalistBody,
  createDatalistItemAction,
} = require('./shared/datalist');
const { setActiveLeftbar } = require('./shared/setActive');
const { updateMainContent } = require('./shared/mainContent');

const defaultProjects = {
  init() {
    if (projectController.getProjects().length <= 0) {
      projectController.addProject({ title: 'Inbox' });
    }
  },
  getInbox() {
    return projectController.getProjects({ title: 'Inbox' })[0];
  },
};

const reloadProjectDatalist = () => {
  const projectBody = document.querySelector('#list-project .datalist__body');
  projectBody.textContent = '';
  let projects = projectController.getProjects();
  // filter default project
  projects = projects.filter((item) => {
    if (item.id !== defaultProjects.getInbox().id) return item;
  });

  projects.forEach((item) => {
    const datalistItem = createDatalistItemTask(item);
    datalistItem.setAttribute('data-filter-name', 'project');
    datalistItem.setAttribute('data-filter-value', item.id);

    // add delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add(...['btn']);
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function () {
      projectController.deleteProject(item.id);
      reloadProjectDatalist();
    });
    datalistItem.append(deleteButton);
    projectBody.append(datalistItem);
  });
};

const createDatalistItemTask = (dataset = {}) => {
  const clickEvent = function () {
    setActiveLeftbar(this);
    updateMainContent();
  };
  const { filterName, filterValue, ...data } = dataset;
  const datalistItem = createDatalistItemAction({ ...data, clickEvent });
  const attributes = {
    'data-link-type': 'dynamic',
    'data-subtype': 'task',
  };
  if (filterName) datalistItem.setAttribute('data-filter-name', filterName);
  if (filterValue !== undefined) {
    datalistItem.setAttribute('data-filter-value', filterValue);
  }

  for (const key in attributes) {
    datalistItem.setAttribute([key], attributes[key]);
  }
  return datalistItem;
};

const createProjectDatalistBody = (list = null) => {
  const datalistBody = createDatalistBody();
  // if (list) {
  //   list.forEach((item) => {
  //     const datalistItem = createDatalistItemTask(item);
  //     datalistItem.setAttribute('data-filter-name', 'project');
  //     datalistItem.setAttribute('data-filter-value', item.id);
  //     datalistBody.append(datalistItem);
  //   });
  // }

  return datalistBody;
};

const createProjectDatalist = () => {
  const title = 'Projects';
  const idName = 'list-project';

  const datalistContainer = createDatalistContainer();
  datalistContainer.id = idName;

  const datalistHeader = createDatalistHeader(title);
  datalistContainer.append(datalistHeader);

  const datalistBody = createProjectDatalistBody();
  datalistContainer.append(datalistBody);

  const projectDatalistFooter = document.createElement('footer');
  projectDatalistFooter.classList.add('datalist__footer');
  projectDatalistFooter.append(createAddFormProject());
  datalistContainer.append(projectDatalistFooter);

  return datalistContainer;
};

const createDefaultDatalist = () => {
  const idName = 'list-default';

  const datalistContainer = createDatalistContainer();
  datalistContainer.id = idName;

  const datalistBody = createDatalistBody();
  let inbox = defaultProjects.getInbox();
  inbox = { ...inbox, filterName: 'project', filterValue: inbox.id };

  const today = { title: 'Today', filterName: 'dueDate', filterValue: '0' };
  const week = { title: 'This Week', filterName: 'dueDate', filterValue: '7' };
  const isDone = {
    title: 'Not Done',
    filterName: 'isDone',
    filterValue: false,
  };
  const allTasks = { title: 'All Tasks' };
  const list = [inbox, today, week, allTasks, isDone];

  list.forEach((item) => {
    const datalistItem = createDatalistItemTask(item);
    datalistBody.append(datalistItem);
  });

  datalistContainer.append(datalistBody);
  return datalistContainer;
};

const createAddFormProject = () => {
  const addEvent = function (e) {
    const projectTitle = e.target
      .closest('.add-form')
      .querySelector('.add-form__title').value;

    projectController.addProject({ title: projectTitle });
    reloadProjectDatalist();
  };
  return createAddForm({ addPlaceholder: 'Add Project', addEvent });
};

const loadSidebar = () => {
  const leftbar = document.querySelector('#leftbar');

  // initialize default projects
  defaultProjects.init();

  const defaultDatalist = createDefaultDatalist();
  leftbar.append(defaultDatalist);

  const projectDatalist = createProjectDatalist();
  leftbar.append(projectDatalist);
  reloadProjectDatalist();

  // set inbox as default tab
  const inboxId = defaultProjects.getInbox().id;
  const inboxEl = document.querySelector(`#leftbar li[data-key="${inboxId}"]`);
  inboxEl.classList.add('active');
  updateMainContent();
};

module.exports = {
  loadSidebar,
};
