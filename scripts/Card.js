export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        const cardElement = cardTemplate.querySelector(".groups__element").cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        const cardImage = this._element.querySelector(".groups__image");
        const addLikeBtn = this._element.querySelector(".groups__like");
        const deleteButton = this._element.querySelector(".groups__deletebtn");

        addLikeBtn.addEventListener("click", () => {
            addLikeBtn.classList.toggle("groups__like_active");
        });

        deleteButton.addEventListener("click", () => {
            this._element.remove();
        });

        cardImage.addEventListener("click", () => {
            const imagePopup = document.querySelector(".popup_type_image");
            const imagePopupImage = imagePopup.querySelector(".popup__picture");
            const imagePopupCaption = imagePopup.querySelector(".popup__caption");
            imagePopupImage.src = this._link;
            imagePopupImage.alt = this._name;
            imagePopupCaption.textContent = this._name;
            this._openPopup(imagePopup);
        });
    }

    createCard(openPopup) {
        this._element = this._getTemplate();
        const cardImage = this._element.querySelector(".groups__image");
        const cardTitle = this._element.querySelector(".groups__title");

        cardTitle.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;

        this._openPopup = openPopup;
        this._setEventListeners();

        return this._element;
    }
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

//функции открытия и закрытия

function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener("click", handlePopupClose);
    document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener("click", handlePopupClose);
    document.removeEventListener("keydown", closeByEscape);
}

function handlePopupClose(evt) {
    const isOverlay = evt.target.classList.contains("popup");
    const isCloseBtn = evt.target.classList.contains("popup__close");
    if (isOverlay || isCloseBtn) {
        closePopup(evt.target.closest(".popup"));
    }
}
document.addEventListener("click", handlePopupClose);

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_open");
        closePopup(openedPopup);
    }
}

function renderInitialCards() {
    const groupsContainer = document.querySelector(".groups");
    initialCards.forEach((card) => {
        const newCard = new Card(card, "#card-template").createCard(openPopup);
        groupsContainer.prepend(newCard);
    });
}

renderInitialCards();
