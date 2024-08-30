const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const form = document.querySelector("form");
const expenseList = document.querySelector("ul");

const expenseQuantity = document.querySelector("aside header p span ");

amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;

  amount.value = formtCurrencyBRL(value);
};

function formtCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}

form.onsubmit = (e) => {
  e.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  };
  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    expenseInfo.append(expenseName, expenseCategory);
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    expenseList.append(expenseItem);
    UppdateTotals();
  } catch (error) {
    alert("Não foi possível adicionar a despesa");
    console.log(error);
  }
}
function UppdateTotals() {
  try {
    const items = expenseList.children;

    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar o total");
  }
}
