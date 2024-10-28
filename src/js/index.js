// // Recover the sessionStorage array
const expenseArray = JSON.parse(sessionStorage.getItem('expenseArray'));

const expenseContainer = document.getElementById('expense-container');

expenseArray.forEach(expense => {
  let expenseElement = document.createElement("div");

  let dateText = document.createTextNode(getFormattedDate());

  let amountImage = document.createElement("img");
  amountImage.setAttribute("src", imgPoint(expense.amount));
  amountImage.className = "amount";

  let amountDiv = document.createElement("div");
  let titleElement = document.createElement("h1");
  titleElement.textContent = expense.title;
  let expenseText = document.createTextNode(`${expense.user} paid ${expense.amount} €`);
  amountDiv.append(titleElement, expenseText)

  expenseElement.append(dateText, amountImage, amountDiv);
  expenseElement.className = "expense";

  expenseContainer.append(expenseElement);
});

function imgPoint(amount) {
  switch (true) {
    case (amount < 1):
      return "src/images/-1euros.png";
    case (amount < 5):
      return "src/images/-5euros.png";
    case (amount < 10):
      return "src/images/-10euros.png";
    case (amount < 50):
      return "src/images/-50euros.png";
    case (amount >= 50):
      return "src/images/+=50euros.png";
  }
}

function getFormattedDate() {
  const today = new Date();

  // Get date in "Oct 27" format using toLocaleDateString in English
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  return formattedDate;
}
