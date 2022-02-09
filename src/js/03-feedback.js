import throttle from 'lodash.throttle';
import * as storage from '../services/localStorage';


const form = document.querySelector('form');

form.addEventListener('input',throttle(inputHandler,500));
const STORAGE_KEY = 'feedback-form-state';

function inputHandler (e) {
   const { name, value } = e.target;
   if (name === 'password') return;

   const parsedData = storage.get(STORAGE_KEY) ?? {};

   const formData = {
      ...parsedData,
      [name]: value,
   };
   storage.save(STORAGE_KEY, formData)
};