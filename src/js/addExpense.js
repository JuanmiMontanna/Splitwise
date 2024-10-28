// Recover the sessionStorage array
const userArray = JSON.parse(sessionStorage.getItem('userArray')) || [];
userSelect();

import { Expense } from "./expense.js";

const addExpenseForm = document.getElementById('addExpenseForm');

document.getElementById('addNewExpense').addEventListener('click', function () {
  if (validateForm()) {
    const user = document.getElementById('users').value;
    const amount = document.getElementById('amount').value;
    const title = document.getElementById('title').value;

    let expense = new Expense(user, amount, title);

    // Recover the sessionStorage array or initialize it if it doesn't exist
    let expenseArray = JSON.parse(sessionStorage.getItem('expenseArray')) || [];
    let expenseTemporalArray = JSON.parse(sessionStorage.getItem('expenseTemporalArray')) || [];
    // Add the new object to the array
    expenseArray.push(expense);
    expenseTemporalArray.push(expense);
    // Save the array in sessionStorage
    sessionStorage.setItem('expenseArray', JSON.stringify(expenseArray));
    sessionStorage.setItem('expenseTemporalArray', JSON.stringify(expenseTemporalArray));

    addExpenseForm.reset();
  }
});

function validateForm() {
  let valid = true;

  const user = document.getElementById('users');
  if (user.value === "") {
    user.setCustomValidity('Please, enter a user.');
    valid = false;
  } else {
    user.setCustomValidity('');
  }

  const amount = document.getElementById('amount');
  if (!amount.value.trim()) {
    amount.setCustomValidity('Please, enter a amount.');
    valid = false;
  } else {
    amount.setCustomValidity('');
  }

  const title = document.getElementById('title');
  const titleValue = title.value.trim();

  const titleRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

  if (!titleValue || !titleRegex.test(titleValue)) {
    title.setCustomValidity('Please, enter a valid title with only letters and spaces.');
    valid = false;
  } else {
    const cleanedTitle = titleValue.replace(/\s+/g, ' ');
    title.value = cleanedTitle;
    title.setCustomValidity('')
  }

  if (!valid) {
    user.reportValidity();
    amount.reportValidity();
    title.reportValidity();
  }

  return valid;
}

function userSelect() {
  const usersSelect = document.getElementById('users');
  userArray.forEach(user => {
    let option = document.createElement("option");
    option.setAttribute("value", user.username);

    option.textContent = user.username;

    usersSelect.append(option);
  });
}
