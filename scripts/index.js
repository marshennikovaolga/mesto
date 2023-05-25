

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
const closeImagePopupBtn = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__picture");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const groupsContainer = document.querySelector(".groups");
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".groups__element").cloneNode(true);
const cardImage = cardElement.querySelector(".groups__image");
const cardTitle = cardElement.querySelector(".groups__title");
const addLikeBtn = cardElement.querySelector(".groups__like");
const deleteButton = cardElement.querySelector(".groups__deletebtn");

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
    openPopup(editPopup);
});

openAddPopupBtn.addEventListener("click", () => {
    addFormElement.reset();
    submitAddBtn.disabled = true;
    submitAddBtn.classList.add("popup__submit_disabled");
    resetInputForm(addFormElement);
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
    resetInputForm(editFormElement);
    closePopup(editPopup);
}

editFormElement.addEventListener("submit", handleEditFormSubmit);

//add
function handleAddFormSubmit(evt) {
    evt.preventDefault();
    if (addCardNameInput.value.trim() === "" || addCardImageInput.value.trim() === "") {
        return;
    }
    addNewCard(addCardNameInput.value, addCardImageInput.value);
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

// массив карточек

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

// создать карточку

function createCard(name, link) {
    const card = cardElement.cloneNode(true);
    const cardImage = card.querySelector(".groups__image");
    const cardTitle = card.querySelector(".groups__title");
    const addLikeBtn = card.querySelector(".groups__like");
    const deleteButton = card.querySelector(".groups__deletebtn");

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    addLikeBtn.addEventListener("click", () => {
        addLikeBtn.classList.toggle("groups__like_active");
    });

    deleteButton.addEventListener("click", () => {
        card.remove();
    });

    cardImage.addEventListener("click", () => {
        imagePopupImage.src = link;
        imagePopupImage.alt = name;
        imagePopupCaption.textContent = name;
        openPopup(imagePopup);
    });

    return card;
}

// добавить на страницу новую карточку

function addNewCard(name, link) {
    const card = createCard(name, link);
    groupsContainer.prepend(card);
}

function renderInitialCards() {
    initialCards.forEach((card) => {
        const newCard = createCard(card.name, card.link);
        groupsContainer.prepend(newCard);
    });
}
renderInitialCards();
