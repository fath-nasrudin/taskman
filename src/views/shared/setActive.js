exports.setActiveLeftbar = function (el) {
  const leftbar = document.querySelector('#leftbar');
  const list = leftbar.querySelectorAll('li');
  Array.from(list).forEach((item) => {
    item.classList.remove('active');
  });
  el.classList.add('active');
};
