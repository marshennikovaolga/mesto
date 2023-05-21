
// переменная с объектом для валидации
const validationConfig = {
    allforms: document.forms,
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    errorSelectorTemplate: 'popup__error_type_',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_visible',
  };
  
  function enableValidation({allforms, inputSelector, submitButtonSelector, ... config}) {
    const forms = Array.from(allforms);
    forms.forEach((form) => {
      const inputList = form.querySelectorAll(inputSelector);
      const button = form.querySelector(submitButtonSelector);
      hangEventListener(inputList, button, config);
    });
  }
  
  // вешаем слушатели
  function hangEventListener(inputList, button, config) {
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, config.inputErrorClass, config.errorSelectorTemplate, config.errorClass);
        toggleButtonState(inputList, button,config.inactiveButtonClass);
      });
    });
  }

  function checkInputValidity(input, inputErrorClass, errorClass) {
    const errorTextElement = document.querySelector(`#${input.name}-error`);
    input.validity.valid ? resetError(input, errorTextElement, inputErrorClass, errorClass) : activeError(input, errorTextElement, inputErrorClass, errorClass);
  }

  // если в инпуте ошибка
  function activeError(input, errorTextElement, inputErrorClass) {
    input.classList.add(inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(validationConfig.errorClass);
    errorTextElement.classList.add(validationConfig.errorSelectorTemplate + input.name);
  }

  function resetError(input, errorTextElement, inputErrorClass, errorClass) {
    input.classList.remove(inputErrorClass);
    errorTextElement.textContent = '';
    errorTextElement.classList.remove(errorClass);
  }
  
  function toggleButtonState(inputList, button, inactiveButtonClass) {
    hasInvalidInput(inputList) ? disableButton(button, inactiveButtonClass) : enableButton(button, inactiveButtonClass);
  }
  
  function hasInvalidInput(inputList) {
    return Array.from(inputList).some((input) => !input.validity.valid);
  }
  
  // активная кнопка
  function enableButton(button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
  
  // неактивная кнопка
  function disableButton(button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  }

// сбрасываем инпуты в форме при закрытии попапа

function resetInputForm(form) {
  const inputList = form.querySelectorAll(validationConfig.inputSelector);
  const errorTextElements = form.querySelectorAll(`.${validationConfig.errorClass}`);

  inputList.forEach((input) => {
    input.classList.remove(validationConfig.inputErrorClass);
  });

  errorTextElements.forEach((errorTextElement) => {
    errorTextElement.textContent = '';
    errorTextElement.classList.remove(validationConfig.errorClass);
  });
}

  enableValidation(validationConfig);
  





// // переменная с объектом для валидации
// const validationConfig = {
//   allforms: document.forms,
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit',
//   inactiveButtonClass: 'popup__submit_disabled',
//   errorSelectorTemplate: 'popup__error_type_',
//   inputErrorClass: 'popup__input_invalid',
//   errorClass: 'popup__error_visible',
// };

// function enableValidation({allforms, inputSelector, submitButtonSelector, ... config}) {
//   const forms = Array.from(allforms);
//   forms.forEach((form) => {
//     const inputList = form.querySelectorAll(inputSelector);
//     const button = form.querySelector(submitButtonSelector);
//     hangEventListener(inputList, button, config);
//   });
// }

// // вешаем слушатели
// function hangEventListener(inputList, button, config) {
//   inputList.forEach((input) => {
//     input.addEventListener('input', () => {
//       checkInputValidity(input, config.inputErrorClass, config.errorSelectorTemplate, config.errorClass);
//       toggleButtonState(inputList, button,config.inactiveButtonClass);
//     });
//   });
// }

// // проверяем на валидность
// function checkInputValidity(input, inputErrorClass, errorSelectorTemplate, errorClass) {
//   const errorTextElement = document.querySelector(`#${input.name}-error`);
//   input.validity.valid ? resetError(input, errorTextElement, inputErrorClass, errorClass) : activeError(input, errorTextElement, errorSelectorTemplate, inputErrorClass, errorClass);
// }


// // если в инпуте ошибка
// function activeError(input, errorTextElement, inputErrorClass, errorClass) {
//   input.classList.add(inputErrorClass);
//   errorTextElement.textContent = input.validationMessage;
//   errorTextElement.classList.add(errorClass);
// }

// // если инпут валидный
// function resetError(input, errorTextElement, inputErrorClass, errorClass) {
//   input.classList.remove(inputErrorClass);
//   errorTextElement.textContent = '';
//   errorTextElement.classList.remove(errorClass);
// }

// function toggleButtonState(inputList, button, inactiveButtonClass) {
//   hasInvalidInput(inputList) ? disableButton(button, inactiveButtonClass) : enableButton(button, inactiveButtonClass);
// }

// function hasInvalidInput(inputList) {
//   return Array.from(inputList).some((input) => !input.validity.valid);
// }

// // активная кнопка
// function enableButton(button, inactiveButtonClass) {
//   button.classList.remove(inactiveButtonClass);
//   button.disabled = false;
// }

// // неактивная кнопка
// function disableButton(button, inactiveButtonClass) {
//   button.classList.add(inactiveButtonClass);
//   button.disabled = true;
// }

// // сбрасываем инпуты в форме при закрытии попапа

// function resetInputForm(form) {
// const inputList = form.querySelectorAll(validationConfig.inputSelector);
// const errorTextElements = form.querySelectorAll(`.${validationConfig.errorClass}`);

// inputList.forEach((input) => {
//   input.classList.remove(validationConfig.inputErrorClass);
// });

// errorTextElements.forEach((errorTextElement) => {
//   errorTextElement.textContent = '';
//   errorTextElement.classList.remove(validationConfig.errorClass);
// });
// }

// enableValidation(validationConfig);
