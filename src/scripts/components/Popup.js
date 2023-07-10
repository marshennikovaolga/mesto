export default class Popup {
    constructor(popupSelector) {
        this._pouup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close');
    }
    open() {
        this._popupCloseButton.classList.add("popup_open");
        document.addEventListener("click", this._handlePopupClose);
        document.addEventListener("keydown", this._closeByEscape);
    }

    close() {
        this._popup.classList.remove("popup_open");
        document.removeEventListener("click", this._handlePopupClose);
        document.removeEventListener("keydown", this._closeByEscape);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handlePopupClose = (evt) => {
        if (evt.target === this._popup || evt.target === this._popupCloseButton) {
            this._close();
        }
    }
    setEventListeners() {
        this._popupCloseButton.addEventListener("click", this.close.bind(this));
    }
}