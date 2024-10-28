import { User } from "./user.js";
const addUserForm = document.getElementById('addUserForm');

document.getElementById('addUser').addEventListener('click', function () {
  if (validateForm()) {
    const username = document.getElementById('username').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const icon = document.querySelector('input[name="icon"]:checked').value;

    let user = new User(username, gender, icon);
    console.log('User:', user);

    // Recover the sessionStorage array or initialize it if it doesn't exist
    let userArray = JSON.parse(sessionStorage.getItem('userArray')) || [];
    // Add the new object to the array
    userArray.push(user);
    // Save the array in sessionStorage
    sessionStorage.setItem('userArray', JSON.stringify(userArray));

    addUserForm.reset();
  }
});

function validateForm() {
  let valid = true;

  const username = document.getElementById('username');
  const usernameValue = username.value.trim();

  const usernameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

  if (!usernameValue || !usernameRegex.test(usernameValue)) {
    username.setCustomValidity('Please, enter a valid username with only letters and spaces.');
    valid = false;
  } else {
    const cleanedUsername = usernameValue.replace(/\s+/g, ' ');
    username.value = cleanedUsername;
    username.setCustomValidity('');
  }

  const gender = document.querySelector('input[name="gender"]:checked');
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  if (!gender) {
    genderRadios.forEach(radio => {
      radio.setCustomValidity('Please, select a genre.');
    });
    valid = false;
  } else {
    genderRadios.forEach(radio => {
      radio.setCustomValidity('');
    });
  }

  const icon = document.querySelector('input[name="icon"]:checked');
  const iconRadios = document.querySelectorAll('input[name="icon"]');
  if (!icon) {
    iconRadios.forEach(radio => {
      radio.setCustomValidity('Please, select an icon.');
    });
    valid = false;
  } else {
    iconRadios.forEach(radio => {
      radio.setCustomValidity('');
    });
  }

  if (!valid) {
    username.reportValidity();
    genderRadios[1].reportValidity();
    iconRadios[1].reportValidity();
  }

  return valid;
}
