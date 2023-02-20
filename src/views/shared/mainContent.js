const { loadTaskContainer } = require('../task.view');
exports.updateMainContent = () => {
  let el = document.querySelector('#leftbar .datalist__item.active');
  if (!el) {
    el = document.querySelector('#leftbar li');
    el.classList.add('active');
  }
  const { linkType, subtype } = el.dataset;

  // if type is project, load project
  // if type is setting call load setting

  if (linkType === 'dynamic') {
    if (subtype === 'task') {
      const { filterName, filterValue } = el.dataset;
      loadTaskContainer({
        type: filterName,
        filterName,
        filterValue,
      });
    }
  }
};
