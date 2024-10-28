export class User {
  username;
  gender;
  icon;
  owed; // she is owed
  owe; // she owes them
  paid;

  constructor(username, gender, icon) {
    this.username = username;
    this.gender = gender;
    this.icon = icon;
    this.owed = 0;
    this.owe = 0;
    this.paid = 0;
  }
};
