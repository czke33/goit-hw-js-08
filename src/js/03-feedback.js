import _throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
const LOCAL_STORAGE = 'feedback-form-state';

let data = {};

loadForm();

formEl.addEventListener('input', _throttle(onSaveFormInput, 500));

formEl.addEventListener('submit', onFormSubmit);

function onSaveFormInput(event) {
  data = JSON.parse(localStorage.getItem(LOCAL_STORAGE)) || {};

  data[event.target.name] = event.target.value;

  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(data));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!event.target.email.value || !event.target.message.value) {
    alert('Enter all data');
    return;
  }

  event.target.reset();
  console.log(data);
  localStorage.removeItem(LOCAL_STORAGE);
}

function loadForm() {
  try {
    let formLoad = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
    if (!formLoad) {
      return;
    }

    data = formLoad;
    formEl.email.value = data.email || '';
    formEl.message.value = data.message || '';
  } catch (error) {
    console.error('Error.message ', error.message);
  }
}
