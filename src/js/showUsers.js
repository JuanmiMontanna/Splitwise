// Recover the sessionStorage array
const userArray = JSON.parse(sessionStorage.getItem('userArray'));
const userContainer = document.getElementById('user-container');

userArray.forEach(user => {
  let userElement = document.createElement("div");

  let userText = document.createTextNode(`User: ${user.username}`);

  let imgIcon = document.createElement("img");
  imgIcon.setAttribute("src", `../images/${user.icon}.png`);

  userElement.append(imgIcon, userText);
  userElement.className = "user";

  userContainer.append(userElement);
});
