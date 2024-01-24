import _throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const emailEl = formEl[(name = 'email')];
const textEl = formEl[(name = 'message')];

savedStorageValue();

formEl.addEventListener('submit', onSubmit);
formEl.addEventListener('input', _throttle(onAddText, 500));

function onSubmit(evt) {
  evt.preventDefault();
  if (emailEl.value === '' || textEl.value === '') {
    return;
  }
  const savedText = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedText);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onAddText(evt) {
  const allData = {
    email: emailEl.value,
    message: textEl.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
  allData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
}

function savedStorageValue() {
  const savedText = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedText) {
    if (savedText.message) {
      textEl.value = savedText.message;
    }
    if (savedText.email) {
      emailEl.value = savedText.email;
    }
  }
}
