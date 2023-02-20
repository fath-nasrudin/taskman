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
  const p = document.createElement('p');

  const text = document.createElement('span');
  text.textContent = 'Copyright \251 ';
  p.append(text);

  const link = document.createElement('a');
  link.href = 'https://github.com/fath-nasrudin';
  link.target = '_blank';
  link.textContent = 'Fathurrohman N';
  p.append(link);

  const year = document.createElement('span');
  year.textContent = ` ${new Date().getFullYear()}`;
  p.append(year);

  footer.append(p);
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
