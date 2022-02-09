import throttle from 'lodash.throttle';

const form = document.querySelector('form');

form.addEventListener('input',throttle(inputHandler,500));

function inputHandler (e) {
   const { name, type, value } = e.target;
   if (name === 'password') return;
}