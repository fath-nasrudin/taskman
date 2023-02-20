exports.createAddForm = ({ addPlaceholder = '', addEvent }) => {
  const form = document.createElement('div');
  form.className = 'add-form';

  const addProjectInput = document.createElement('input');
  addProjectInput.type = 'text';
  addProjectInput.classList.add('add-form__title');
  addProjectInput.placeholder = addPlaceholder;
  form.append(addProjectInput);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add(...['btn__container', 'w-full']);
  const addButton = document.createElement('button');
  addButton.classList.add(...['btn', 'btn--success']);
  addButton.type = 'button';
  addButton.textContent = 'Add';

  const clearEvent = function () {
    const children =
      this.closest('.add-form').querySelectorAll('input[type=text]');
    Array.from(children).forEach((child) => (child.value = null));
  };
  addButton.addEventListener('click', addEvent);
  addButton.addEventListener('click', clearEvent);
  buttonContainer.append(addButton);

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.classList.add(...['btn', 'btn--danger']);
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', clearEvent);
  buttonContainer.append(cancelButton);

  form.append(buttonContainer);
  return form;
};
