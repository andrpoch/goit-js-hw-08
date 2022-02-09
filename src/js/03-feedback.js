import throttle from 'lodash.throttle';

const form = document.querySelector('form');

form.addEventListener('input',throttle(onInput,500));

function onInput (e) {
   const formData = {};
   formData[e.target.name] = e.target.value;
   console.log(formData);
}