export class UserInfo {
  constructor(userName, userJob) {
    this.userName = userName;
    this.userJob = userJob;
  }

  setUserInfo(updatedName, updatedJob) {
    this.userName = updatedName;
    this.userJob = updatedJob;
  }

  updateUserInfo(name, job) {
    // Значительно удобнее передать эти элементы один раз в конструктор и потом к ним обращаться уже
    name.textContent = this.userName;
    job.textContent = this.userJob;
  }
}