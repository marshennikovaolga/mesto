export class FormValidator {
    constructor(formElement, validationConfig) {
        this._formElement = formElement;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._errorSelectorTemplate = validationConfig.errorSelectorTemplate;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
    }

    //проверка на валидность
    _checkInputValidity(input) {
        const errorTextElement = document.querySelector(`#${input.name}-error`);
        input.validity.valid ? this._resetError(input, errorTextElement) : this._activeError(input, errorTextElement);
    }

    // если в инпуте ошибка
    _activeError(input, errorTextElement) {
        input.classList.add(this._inputErrorClass);
        errorTextElement.textContent = input.validationMessage;
        errorTextElement.classList.add(this._errorClass);
        errorTextElement.classList.add(this._errorSelectorTemplate + input.name);
    }

    _toggleButtonState(inputList, button) {
        if (this._hasInvalidInput(inputList)) {
            this._disableButton(button, this._inactiveButtonClass);
        } else {
            this._enableButton(button, this._inactiveButtonClass);
        }
    }

    _hasInvalidInput(inputList) {
        return Array.from(inputList).some((input) => !input.validity.valid);
    }

    // активная кнопка
    _enableButton(button) {
        button.classList.remove(this._inactiveButtonClass);
        button.disabled = false;
    }

    // неактивная кнопка
    _disableButton(button) {
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
    }

    // // если инпуты валидны
    _resetError(input, errorTextElement) {
        input.classList.remove(this._inputErrorClass);
        errorTextElement.textContent = "";
        errorTextElement.classList.remove(this._errorClass);
    }

    // сбрасываем инпуты в форме при закрытии попапа
    resetInputForm(form) {
        const inputList = form.querySelectorAll(this._inputSelector);
        inputList.forEach((input) => {
            input.classList.remove(this._inputErrorClass);
        });
    }

    _hangEventListeners(inputList, button) {
        inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState(inputList, button);
            });
        });
    }

    enableValidation() {
        const inputList = this._formElement.querySelectorAll(this._inputSelector);
        const button = this._formElement.querySelector(this._submitButtonSelector);
        this._hangEventListeners(inputList, button);
        this._toggleButtonState(inputList, button);
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
    }
}

const validationConfig = {
    allforms: document.forms,
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    errorSelectorTemplate: "popup__error_type_",
    inputErrorClass: "popup__input_invalid",
    errorClass: "popup__error_visible",
};

function enableValidation(config) {
    const forms = Array.from(config.allforms);
    forms.forEach((form) => {
        const formValidator = new FormValidator(form, config);
        formValidator.enableValidation();
    });
}

enableValidation(validationConfig);
