// edit
const editPopup = document.querySelector(".popup_type_edit");
const editFormElement = editPopup.querySelector(".popup__container");
const openEditPopupBtn = document.querySelector(".profile__btn-edit");
const closeEditPopupBtn = editPopup.querySelector(".popup__close");
const profileName = document.querySelector(".profile__person");
const profileJob = document.querySelector(".profile__description");
const editNameInput = editFormElement.querySelector(".popup__input_type_name");
const editJobInput = editFormElement.querySelector(".popup__input_type_job");

const addPopup = document.querySelector(".popup_type_add");
const addFormElement = addPopup.querySelector(".popup__container");
const openAddPopupBtn = document.querySelector(".profile__btn-add");
const closeAddPopupBtn = addPopup.querySelector(".popup__close");
const addCardNameInput = addFormElement.querySelector(".popup__input_type_card");
const addCardImageInput = addFormElement.querySelector(".popup__input_type_link");

const groupsContainer = document.querySelector(".groups");

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

// открыть
function openEditPopup() {
    editPopup.classList.add("popup_open");
}

function openAddPopup() {
    addPopup.classList.add("popup_open");
}

openEditPopupBtn.addEventListener("click", openEditPopup);
openAddPopupBtn.addEventListener("click", openAddPopup);

// закрыть
function closePopup(evt) {
    const isOverlay = evt.target === editPopup || evt.target === addPopup;
    const isCloseBtn = evt.target === closeEditPopupBtn || evt.target === closeAddPopupBtn;

    if (isOverlay || isCloseBtn) {
        if (evt.target === closeEditPopupBtn) {
            editPopup.classList.remove("popup_open");
        } else if (evt.target === closeAddPopupBtn) {
            addPopup.classList.remove("popup_open");
        }
    }
}

// слушатели

closeEditPopupBtn.addEventListener("click", closePopup);
closeAddPopupBtn.addEventListener("click", closePopup);
editPopup.addEventListener("click", closePopup);
addPopup.addEventListener("click", closePopup);

// создать новую карточку
function createCard(name, link) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".groups__element").cloneNode(true);
    const cardImage = cardElement.querySelector(".groups__image");
    const cardTitle = cardElement.querySelector(".groups__title");
    const addLikeBtn = cardElement.querySelector(".groups__like");
    const deleteButton = cardElement.querySelector(".groups__deletebtn");

    if (!name || !link) {
        console.log("заполните оба поля");
        return;
    }

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    // удалить карточку
    deleteButton.addEventListener("click", function (evt) {
        evt.target.closest(".groups__element").remove();
    });

    return cardElement;
}
groupsContainer.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("groups__deletebtn")) {
        evt.target.closest(".groups__element").remove();
    }
});

// добавить карточку на страницу
function addCard(name, link) {
    const newCard = createCard(name, link);
    groupsContainer.prepend(newCard);
}

addFormElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const cardName = addFormElement.querySelector(".popup__input_type_card").value;
    const cardLink = addFormElement.querySelector(".popup__input_type_link").value;
    addCard(cardName, cardLink);
    closePopup(evt);
    addFormElement.reset();
});

// поставить лайк

groupsContainer.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("groups__like")) {
        evt.target.classList.toggle("groups__like_active");
    }
});

// открыть картинку

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__picture-close");
const imagePopupImage = imagePopup.querySelector(".popup__picture");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

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

// слушатели
groupsContainer.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("groups__image")) {
        const cardElement = evt.target.closest(".groups__element");
        const cardTitle = cardElement.querySelector(".groups__title").textContent;
        const cardImage = cardElement.querySelector(".groups__image").src;
        openImagePopup(cardTitle, cardImage);
    }
});
