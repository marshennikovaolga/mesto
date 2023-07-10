export class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector(".groups__image");
      this._addLikeBtn = this._element.querySelector(".groups__like");
      this._deleteButton = this._element.querySelector(".groups__deletebtn");
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        const cardElement = cardTemplate.querySelector(".groups__element").cloneNode(true);
        return cardElement;
      }

    _setEventListeners() {
        this._addLikeBtn.addEventListener("click", () => {
        this._addLikeBtn.classList.toggle("groups__like_active");
    });

    this._cardImage.addEventListener("click", () => {
        const imagePopup = document.querySelector(".popup_type_image");
        const imagePopupImage = imagePopup.querySelector(".popup__picture");
        const imagePopupCaption = imagePopup.querySelector(".popup__caption");
        imagePopupImage.src = this._link;
        imagePopupImage.alt = this._name;
        imagePopupCaption.textContent = this._name;
        this._openPopup(imagePopup);
      });

    this._deleteButton.addEventListener("click", () => {
        this._element.remove();
    });
}

    createCard(openPopup) {
        const cardTitle = this._element.querySelector(".groups__title");
        cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._openPopup = openPopup;
        this._setEventListeners();

        return this._element;
    }
}