/*
  Объекты веб-хранилища localStorage и sessionStorage позволяют хранить пары ключ/значение в браузере.
  - key и value должны быть строками.
  - Лимит 2 Мб+, зависит от браузера.
  - Данные не имеют «времени истечения».
  - Данные привязаны к источнику (домен/протокол/порт).
*/

//////////////////////////////////////////////////////////////////////

/*
 * Задача (пишем сразу без локальной переменной)
 * 1) При каждом изменении любого элемента формы (включая чекбокс), кроме пароля, записывать его новое значение в LocalStorage. Значения всех инпутов должны храниться в LocalStorage в объекте (имя инпута: значение)
 * 2) При перезагрузке страницы нужно считывать информацию из LocalStorage, и если там есть сохраненные данные - записывать их в значения элементов формы (автозаполнение формы)
 * 3) При сабмите формы считать данные с помощью FormData
 * 4) Записать все поля и значения в финальный объект, используя FormData.entries() и for of
 * 5) Если есть пустое поле - вывести сообщение и выйти из функции
 * 6) В поле canBeSpammed в финальном объекте должен быть буль
 * 7) При сабмите нужно очищать форму и LocalStorage, а финальные данные вывести в консоль
 * 8) Считывание данных из LocalStorage должно быть безопасным и вынесено в отдельную функцию
 * 9) Хранение сложных данных: массивы, объекты
 * 10) Сервисы для localStorage
 */

// const data = {
//   address: '123 Shevchenko Av',
//   canBeSpammed: true,
//   city: 'Odesa',
//   email: 'mail@mail.com',
//   password: 'qwerty',
// };

import * as storage from '../services/localStorage';

const formRef = document.querySelector('#sign-in');

const STORAGE_KEY = 'formData';

// const getSavedData = key => {
//   try {
//     const savedData = localStorage.getItem(key);
//     const parsedData = JSON.parse(savedData) ?? {};
//     return parsedData;
//   } catch (error) {
//     return {};
//   }
// };

const inputHandler = e => {
  const { name, type, checked, value } = e.target;

  if (name === 'password') return;

  const parsedData = storage.get(STORAGE_KEY) ?? {};

  const formData = {
    ...parsedData,
    [name]: type === 'checkbox' ? checked : value,
  };

  storage.save(STORAGE_KEY, formData);

  // const serializedData = JSON.stringify(formData);
  // localStorage.setItem(STORAGE_KEY, serializedData);
};

const rehydrateData = () => {
  const parsedData = storage.get(STORAGE_KEY) ?? {};

  // if (!parsedData) {
  //   return;
  // }

  const inputNames = Object.keys(parsedData);

  inputNames.forEach(inputName => {
    const input = formRef.elements[inputName];

    if (input.type === 'checkbox') {
      input.checked = parsedData[inputName];
    } else {
      input.value = parsedData[inputName];
    }

    // const key = input.type === 'checkbox' ? 'checked' : 'value';
    // input[key] = parsedData[inputName];
  });

  // formRef.elements.email.value = parsedData.email;
  // formRef.elements.address.value = parsedData.address;
  // formRef.elements.city.value = parsedData.city;
  // formRef.elements.canBeSpammed.checked = parsedData.canBeSpammed;
};

rehydrateData();

const submitHandler = e => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const finalData = {};

  // formData.forEach((value, key) => {
  //   if (!value) {
  //     alert('Please fill in all the fields!');
  //     return;
  //   }
  //   finalData[key] = value;
  // });

  for (const [key, value] of formData.entries()) {
    if (!value) {
      alert('Please fill in all the fields!');
      return;
    }
    finalData[key] = value;
  }

  finalData.canBeSpammed = !!finalData.canBeSpammed;
  // finalData.canBeSpammed = Boolean(finalData.canBeSpammed);

  // if (finalData.canBeSpammed) {
  //   finalData.canBeSpammed = true;
  // } else {
  //   finalData.canBeSpammed = false;
  // }

  console.log(finalData);

  form.reset();
  // localStorage.removeItem(STORAGE_KEY);
  storage.remove(STORAGE_KEY);
};

formRef.addEventListener('input', inputHandler);
formRef.addEventListener('submit', submitHandler);
