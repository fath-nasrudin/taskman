const createDatalistItem = (dataset = {}) => {
  const title = dataset.title ? dataset.title : 'Untitled';
  const id = dataset.id;
  const clickEvent = dataset.clickEvent;

  const dataListItem = document.createElement('li');
  dataListItem.classList.add(...['datalist__item']);
  if (id) dataListItem.setAttribute('data-key', id);
  dataListItem.textContent = title;

  if (clickEvent) dataListItem.addEventListener('click', clickEvent);
  return dataListItem;
};

const createDatalistItemAction = (dataset = {}) => {
  const datalistItem = createDatalistItem(dataset);
  datalistItem.classList.add('action');
  return datalistItem;
};

const createDatalistBody = (list) => {
  const datalistBody = document.createElement('div');
  datalistBody.classList.add('datalist__body');
  return datalistBody;
};

const createDatalistHeader = (title) => {
  const datalistHeader = document.createElement('h3');
  datalistHeader.classList.add('datalist__header');
  datalistHeader.textContent = title;
  return datalistHeader;
};

const createDatalistContainer = () => {
  const datalist = document.createElement('ul');
  datalist.classList.add('datalist');
  return datalist;
};

module.exports = {
  createDatalistContainer,
  createDatalistHeader,
  createDatalistBody,
  createDatalistItem,
  createDatalistItemAction,
};
