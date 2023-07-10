import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import "./index.css";
import initialCards from "../scripts/utils/constants.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
const popupSelector = '.popup';
const popup = new Popup(popupSelector);

// попап профиля
const editPopupSelector = '.popup_type_edit';
const editPopup = new PopupWithForm(editPopupSelector, (formData) => {
  console.log(formData);
});

// попап с карточками
const imagePopupSelector = '.popup_type_image';
const imagePopup = new PopupWithImage(imagePopupSelector);

// слушатели
const openEditPopupBtn = document.querySelector('.profile__btn-edit');
const openImagePopupBtn = document.querySelector('.image__btn');
openEditPopupBtn.addEventListener('click', () => {
  editPopup.open();
});
openImagePopupBtn.addEventListener('click', () => {
  imagePopup.open('image.jpg', 'Описание картинки');
});

// Добавление слушателей для закрытия попапов
popup.setEventListeners();
editPopup.setEventListeners();
imagePopup.setEventListeners();

// валидация
const validationConfig = {
    allforms: document.forms,
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    errorSelectorTemplate: "popup__error_type_",
    inputErrorClass: "popup__input_invalid",
    errorClass: "popup__error_visible",
};

const editFormElement = document.querySelector('.popup__form_edit');
const editFormValidator = new FormValidator(editFormElement, validationConfig);
editFormValidator.enableValidation();

const addFormElement = document.querySelector('.popup__form_add');
const addFormValidator = new FormValidator(addFormElement, validationConfig);
addFormValidator.enableValidation();


// Инициализация карточек
const groupsContainer = document.querySelector('.groups');
initialCards.forEach((cardData) => {
  const card = new Card(cardData);
  const cardElement = card.createCard();
  groupsContainer.appendChild(cardElement);
});

const userInfo = new UserInfo('.profile__name', '.profile__job');


console.log('Hello, World!');
console.log('Hello, World!') 

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 
