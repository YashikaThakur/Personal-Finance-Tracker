// JavaScript code goes here

// Sample transaction data
let transactions = [
    { id: 1, type: 'income', description: 'Salary', amount: 5000 },
    { id: 2, type: 'expense', description: 'Rent', amount: 1000 },
    { id: 3, type: 'expense', description: 'Groceries', amount: 200 },
  ];

  function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = ''; // Clear existing rows before adding new ones
  
    transactions.forEach((transaction, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${transaction.description}</td>
        <td>${transaction.type}</td>
        <td>${transaction.amount}</td>
        <td class="button-container">
          <button class="edit-button" onclick="editTransaction(${index})">Edit</button>
          <button class="delete-button" onclick="deleteTransaction(${index})">Delete</button>
        </td>
      `;
      transactionList.appendChild(row);
    });
  }

function displayBalance() {
  const balanceElement = document.getElementById('balance');
  const income = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const balance = income - expenses;

  balanceElement.innerHTML = `Current Balance: ${balance}`;
}

function addTransaction() {
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const typeInput = document.getElementById('type');

  const description = descriptionInput.value;
  const amount = Number(amountInput.value);
  const type = typeInput.value;

  if (description && amount && type) {
    const id = transactions.length + 1;
    const newTransaction = { id, type, description, amount };
    transactions.push(newTransaction);

    descriptionInput.value = '';
    amountInput.value = '';
    typeInput.value = '';

    displayTransactions();
    displayBalance();
  }
}

function editTransaction(id) {
  const transaction = transactions.find(transaction => transaction.id === id);
  if (transaction) {
    const description = prompt('Enter new description:', transaction.description);
    const amount = Number(prompt('Enter new amount:', transaction.amount));

    if (description && amount) {
      transaction.description = description;
      transaction.amount = amount;

      displayTransactions();
      displayBalance();
    }
  }
}

function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  displayTransactions();
  displayBalance();
}

displayTransactions();
displayBalance();
