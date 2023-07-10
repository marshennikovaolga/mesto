export class FormValidator {
    constructor(formElement, validationConfig) {
        this._formElement = formElement;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._errorSelectorTemplate = validationConfig.errorSelectorTemplate;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
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

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
          this._disableButton();
        } else {
          this._enableButton();
        }
      }

      _hasInvalidInput() {
        return Array.from(this._inputList).some((input) => !input.validity.valid);
      }

    // активная кнопка
    _enableButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
      }
    
    // неактивная кнопка
      _disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
      }

    // если инпуты валидны
    _resetError(input, errorTextElement) {
        input.classList.remove(this._inputErrorClass);
        errorTextElement.textContent = "";
        errorTextElement.classList.remove(this._errorClass);
    }

    // сбрасываем инпуты в форме при закрытии попапа
    resetInputForm() {
        this._inputList.forEach((input) => {
          const errorTextElement = document.querySelector(`#${input.name}-error`);
          this._resetError(input, errorTextElement);
        });
        this._disableButton();
      }


    _hangEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._hangEventListeners();
        this._toggleButtonState();
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
    }
}
