import throttle from 'lodash.throttle';
import * as storage from '../services/localStorage';


const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

function inputHandler (e) {
   const { name, value } = e.target;

   const parsedData = storage.get(STORAGE_KEY) || {};
   const formData = {
      ...parsedData,
      [name]: value,
   };
   storage.save(STORAGE_KEY, formData)
};

function rehydrateData() {
   const parsedData = storage.get(STORAGE_KEY);
   const {
      elements: { email, message }
   } = form;
   email.value = parsedData?.email || '';
   message.value = parsedData?.message || '';
}
rehydrateData();

function submitHandler(e) {
   e.preventDefault();
   const form = e.currentTarget;
   const formData = new FormData(form);
   const finalData = {};

   for (const [key, value] of formData.entries()) {
      if (!value) {
         alert('Quickly fill in all the fields!');
         return;
      }
      finalData[key] = value;  
   }
   console.log(finalData);
   form.reset();
   storage.remove(STORAGE_KEY);
};
form.addEventListener('input',throttle(inputHandler,500));
form.addEventListener('submit', submitHandler);