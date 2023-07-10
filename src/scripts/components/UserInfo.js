export default class UserInfo {
    constructor(nameSelector, jobSelector) {
      this._nameElement = document.querySelector(nameSelector);
      this._jobElement = document.querySelector(jobSelector);
    }
  
    getUserInfo() {
      const userInfo = {
        name: this._nameElement.textContent,
        job: this._jobElement.textContent
      };
      return userInfo;
    }
  
    setUserInfo({ name, job }) {
      this._nameElement.textContent = name;
      this._jobElement.textContent = job;
    }
  }
  