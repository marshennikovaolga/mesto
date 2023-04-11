const openPopupBtn = document.querySelector(".profile__btn-edit");
const popup = document.querySelector(".popup");
const closePopupBtn = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__container");
const profileName = document.querySelector(".profile__person");
const profileJob = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-job");

function openPopup() {
    popup.classList.add("popup_open");
}

function closePopup(evt) {
    const isOverlay = evt.target === popup;
    const isCloseBtn = evt.target === closePopupBtn;

    if (isOverlay || isCloseBtn) {
        popup.classList.remove("popup_open");
    }
}

closePopupBtn.addEventListener("click", closePopup);
openPopupBtn.addEventListener("click", openPopup);
popup.addEventListener("click", closePopup);

function handleForSubmit(evt) {
    evt.preventDefault();
    if (nameInput.value.trim() === "" || jobInput.value.trim() === "") {
        return;
    }
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove("popup_open");
}

formElement.addEventListener("submit", handleForSubmit);

