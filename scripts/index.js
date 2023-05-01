// edit
const editPopup = document.querySelector(".popup_type_edit");
const editFormElement = editPopup.querySelector(".popup__container");
const openEditPopupBtn = document.querySelector(".profile__btn-edit");
const closeEditPopupBtn = editPopup.querySelector(".popup__close");
const submitEditBtn = editPopup.querySelector(".popup__submit");
const profileName = document.querySelector(".profile__person");
const profileJob = document.querySelector(".profile__description");
const editNameInput = editFormElement.querySelector(".popup__input_type_name");
const editJobInput = editFormElement.querySelector(".popup__input_type_job");

//add
const addPopup = document.querySelector(".popup_type_add");
const addFormElement = addPopup.querySelector(".popup__container");
const openAddPopupBtn = document.querySelector(".profile__btn-add");
const closeAddPopupBtn = addPopup.querySelector(".popup__close");
const submitAddBtn = addPopup.querySelector(".popup__submit");
const addCardNameInput = addFormElement.querySelector(".popup__input_type_card");
const addCardImageInput = addFormElement.querySelector(".popup__input_type_link");

// карточка
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__picture-close");
const imagePopupImage = imagePopup.querySelector(".popup__picture");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const groupsContainer = document.querySelector(".groups");

// универсальные функции откыть и закрыть
function openPopup(popup) {
  popup.classList.add('popup_open');
}
function closePopup(popup) {
  popup.classList.remove('popup_open');
}

// открыть
openEditPopupBtn.addEventListener('click', () => {
  openPopup(editPopup);
})

openAddPopupBtn.addEventListener('click', () => {
  openPopup(addPopup);
});
// закрыть

closeEditPopupBtn.addEventListener('click', () => {
  closePopup(editPopup);
});

closeAddPopupBtn.addEventListener("click", () => {
  closePopup(addPopup);
});

// закрыть картинку

imagePopupCloseBtn.addEventListener("click", () => {
  closePopup(imagePopup);
})

// ввести и сохранить данные
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  if (editNameInput.value.trim() === "" || editJobInput.value.trim() === "") {
    return;
  };
  profileName.textContent = editNameInput.value;
  profileJob.textContent = editJobInput.value;
  closePopup(editPopup);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    if (addCardNameInput.value.trim() === "" || addCardImageInput.value.trim() === "") {
      return;
    }
    const newCard = createCard(addCardNameInput.value, addCardImageInput.value);
    groupsContainer.prepend(newCard);
    addFormElement.reset();
    closePopup(addPopup);
  }

  addFormElement.addEventListener("submit", handleAddFormSubmit);

// закрыть попап при клике на оверлэй
function handleOverlayClick(evt) {
  const isOverlay = evt.target.classList.contains('popup');
  const isCloseBtn = evt.target.classList.contains('popup__close');
  if (isOverlay || isCloseBtn) {
    closePopup(evt.target.closest('.popup'));
  }
}

editPopup.addEventListener('click', handleOverlayClick);
addPopup.addEventListener('click', handleOverlayClick);
imagePopup.addEventListener('click', handleOverlayClick);

// создать новую карточку
function createCard(name, link) {
    const cardTemplate = document.querySelector("#card-template").content;
    const groupsContainer = document.querySelector(".groups");
    const cardElement = cardTemplate.querySelector(".groups__element").cloneNode(true);
    const cardImage = cardElement.querySelector(".groups__image");
    const cardTitle = cardElement.querySelector(".groups__title");
    const addLikeBtn = cardElement.querySelector(".groups__like");
    const deleteButton = cardElement.querySelector(".groups__deletebtn");

    if (!name || !link) {
        return;
    }
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    addLikeBtn.addEventListener('click', function () {
        addLikeBtn.classList.toggle('groups__like_active');
      });
      
      deleteButton.addEventListener('click', function () {
        deleteButton.closest('.groups__element').remove();
      });
      groupsContainer.appendChild(cardElement);
      return cardElement;
} 

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

// добавить карточку на страницу
function addCard(name, link) {
    const newCard = createCard(name, link);
    groupsContainer.prepend(newCard);
} 

addFormElement.addEventListener("submit", function (evt) {
    evt.preventDefault(); 
    const cardName = addCardNameInput.value;
    const cardLink = addCardImageInput.value;
    addCard(cardName, cardLink);
    closePopup(addPopup);
    addFormElement.reset();
    });

// открыть картинку 
function openImagePopup(name, link) {
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    imagePopup.classList.add("popup_open");
}

// закрыть картинку 
function closeImagePopup() { 
    imagePopup.classList.remove("popup_open");
} 

imagePopup.addEventListener("click", closePopup); 
imagePopupCloseBtn.addEventListener("click", closeImagePopup); 


groupsContainer.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("groups__image")) {
        const cardElement = evt.target.closest(".groups__element");
        const cardTitle = cardElement.querySelector(".groups__title").textContent;
        const cardImage = cardElement.querySelector(".groups__image").src;
        openImagePopup(cardTitle, cardImage);
    }
    return cardElement;
});