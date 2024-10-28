// Recover the sessionStorage array
const userArray = JSON.parse(sessionStorage.getItem('userArray')) || [];
let expenseTemporalArray = JSON.parse(sessionStorage.getItem('expenseTemporalArray')) || [];

const balancesContainer = document.getElementById('balances-container');
const buttonSettleUp = document.getElementById('settleUp');
fillOutExpenses();
drawBalances();

buttonSettleUp.addEventListener('click', function () {
  expenseTemporalArray = [];
  sessionStorage.setItem('expenseTemporalArray', JSON.stringify(expenseTemporalArray));
  fillOutExpenses();
  drawBalances();
});

function drawBalances() {
  balancesContainer.innerHTML = '';
  userArray.forEach(user => {
    let userElement = document.createElement("div");
    userElement.className = "balance";

    let userData = document.createElement("div");
    let userText = document.createElement("h4");
    userText.textContent = `User: ${user.username}`;

    let paidText = document.createElement("p");
    let owedText = document.createElement("p");
    let oweText = document.createElement("p");

    let paidFormatted = formatNumber(user.paid);
    let owedFormatted = formatNumber(user.owed);
    let oweFormatted = formatNumber(user.owe);

    if (user.gender == "Male") {
      paidText.textContent = `He has paid ${paidFormatted} €`;
      owedText.textContent = `He is owed ${owedFormatted} €`;
      oweText.textContent = `He owes ${oweFormatted} €`;
    } else {
      paidText.textContent = `She has paid ${paidFormatted} €`;
      owedText.textContent = `She is owed ${owedFormatted} €`;
      oweText.textContent = `She owes ${oweFormatted} €`;
    }
    userData.append(userText, paidText, owedText, oweText);

    let imgIcon = document.createElement("img");
    imgIcon.setAttribute("src", `../images/${user.icon}.png`);

    userElement.append(imgIcon, userData);

    balancesContainer.append(userElement);
  });
}

function fillOutExpenses() {
  if (expenseTemporalArray.length !== 0) {
    let total = 0;

    userArray.forEach(user => {
      user.paid = 0;
      user.owed = 0;
      user.owe = 0;
    });

    userArray.forEach(user => {
      expenseTemporalArray.forEach(expense => {
        if (user.username === expense.user) {
          user.paid = (user.paid + (Number(expense.amount)));
        }
      });
      total = total + user.paid;
    });
    let average = total / userArray.length;
    userArray.forEach(user => {
      if ((user.paid - average) > 0) {
        user.owed = user.paid - average;
        user.owe = 0;
      } else {
        user.owed = 0;
        user.owe = average - user.paid;
      }
    });
  } else {
    userArray.forEach(user => {
      user.paid = 0;
      user.owed = 0;
      user.owe = 0;
    });
  }
}

function formatNumber(num) {
  return Number(num).toFixed(2).replace(/\.00$/, "");
}
