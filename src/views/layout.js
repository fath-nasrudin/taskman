const { loadSidebar } = require('./project.view');

const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  header.textContent = 'Taskman';
  return header;
};

const createFooter = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.textContent = 'Footer';
  return footer;
};

const createSidebar = () => {
  const element = document.createElement('aside');
  element.classList.add('sidebar');
  element.setAttribute('id', 'leftbar');
  return element;
};

const createBody = () => {
  const element = document.createElement('main');
  element.classList.add('body');
  element.setAttribute('id', 'main');
  element.textContent = 'main cpntent';
  return element;
};

const createMainContainer = () => {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');
  mainContainer.id = 'main-container';

  mainContainer.append(createHeader());
  mainContainer.append(createSidebar());
  mainContainer.append(createBody());
  mainContainer.append(createFooter());
  return mainContainer;
};

const loadWebiste = () => {
  const mainContainer = createMainContainer();
  document.body.append(mainContainer);
  loadSidebar();
};

module.exports = {
  loadWebiste,
};
