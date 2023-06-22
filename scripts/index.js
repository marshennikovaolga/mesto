import { Card } from "./Card.js";
import { FormValidator, validationConfig } from "./FormValidator.js";

// edit
const editPopup = document.querySelector(".popup_type_edit");
const editFormElement = editPopup.querySelector(".popup__container");
const openEditPopupBtn = document.querySelector(".profile__btn-edit");
const submitEditBtn = editPopup.querySelector(".popup__submit");
const profileName = document.querySelector(".profile__person");
const profileJob = document.querySelector(".profile__description");
const editNameInput = editFormElement.querySelector(".popup__input_type_name");
const editJobInput = editFormElement.querySelector(".popup__input_type_job");

//add
const addPopup = document.querySelector(".popup_type_add");
const addFormElement = addPopup.querySelector(".popup__container");
const openAddPopupBtn = document.querySelector(".profile__btn-add");
const submitAddBtn = addPopup.querySelector(".popup__submit");
const addCardNameInput = addFormElement.querySelector(".popup__input_type_card");
const addCardImageInput = addFormElement.querySelector(".popup__input_type_link");

// карточка
const imagePopup = document.querySelector(".popup_type_image");
const closeImagePopupBtn = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__picture");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const groupsContainer = document.querySelector(".groups");
const cardTemplate = document.querySelector("#card-template").content;

// открыть попап
function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener("click", handlePopupClose);
    document.addEventListener("keydown", closeByEscape);
}

// закрыть попап
function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener("click", handlePopupClose);
    document.removeEventListener("keydown", closeByEscape);
}

//закрытие нажатием на Escape
function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_open");
        closePopup(openedPopup);
    }
}

// слушатели
openEditPopupBtn.addEventListener("click", () => {
    editNameInput.value = profileName.textContent;
    editJobInput.value = profileJob.textContent;
    submitEditBtn.disabled = false;
    submitEditBtn.classList.remove("popup__submit_disabled");
    
    const form = editPopup.querySelector(".popup__container");
    if (form) {
        const formValidator = new FormValidator(form, validationConfig);
        openPopup(editPopup);
        formValidator.resetInputForm(form); // сброс значений формы при открытии попапа - 
        // не могу разобраться что сделать чтобы сбрасывались только ошибки
    }
});

openAddPopupBtn.addEventListener("click", () => {
    addFormElement.reset();
    submitAddBtn.disabled = true;
    submitAddBtn.classList.add("popup__submit_disabled");
    openPopup(addPopup);
});

// ввести и сохранить данные

//edit
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    if (editNameInput.value.trim() === "" || editJobInput.value.trim() === "") {
        return;
    }
    profileName.textContent = editNameInput.value;
    profileJob.textContent = editJobInput.value;
    // resetInputForm(editFormElement);
    closePopup(editPopup);
}
  
editFormElement.addEventListener("submit", handleEditFormSubmit);

//add
function handleAddFormSubmit(evt) {
    evt.preventDefault();
    if (addCardNameInput.value.trim() === "" || addCardImageInput.value.trim() === "") {
        return;
    }
    const newCard = new Card({ name: addCardNameInput.value, link: addCardImageInput.value,},
    "#card-template");
    const cardElement = newCard.createCard(openPopup);
    groupsContainer.prepend(cardElement);
    closePopup(addPopup);
}

addFormElement.addEventListener("submit", handleAddFormSubmit);

// закрыть popup при клике на оверлэй
function handlePopupClose(evt) {
    const isOverlay = evt.target.classList.contains("popup");
    const isCloseBtn = evt.target.classList.contains("popup__close");
    if (isOverlay || isCloseBtn) {
        closePopup(evt.target.closest(".popup"));
    }
}
