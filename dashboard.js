function updateBalanceDisplay() {
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    document.querySelector('#account-details .card p:nth-child(4)').innerHTML = `<strong>Balance:</strong>₹${currentBalance.toFixed(2)}`;
}
function updateAccountDetails() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        document.querySelector('#account-details .card').innerHTML = `
            <p><strong>Account Number:</strong> ${loggedInUser.acno}</p>
            <p><strong>Account Holder:</strong> ${loggedInUser.name}</p>
            <p><strong>Account Type:</strong> ${loggedInUser.accountType || 'Savings'}</p>
            <p><strong>Balance:</strong> ₹${parseFloat(localStorage.getItem('balance')) || '0.00'}</p>
        `;
    } else {
        alert('No user is currently logged in.');
        window.location.href = './login.html'; // Redirect to login if no user is logged in
    }
}



function updateTransactionHistory(transaction) {
    const transactionHistory = document.querySelector('#transactions .card ul');
    const date = new Date().toLocaleDateString();
    const transactionItem = `<li><strong>Date:</strong> ${date} - <strong>Type:</strong> ${transaction.type} - <strong>Amount:</strong>₹${transaction.amount.toFixed(2)}</li>`;
    transactionHistory.insertAdjacentHTML('beforeend', transactionItem);
}

function deposit() {
    let amount = parseFloat(document.getElementById('deposit-amount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    currentBalance += amount;

    localStorage.setItem('balance', currentBalance);
    updateBalanceDisplay();
    updateTransactionHistory({ type: 'Deposit', amount: amount });

    alert("Deposit successful");
    document.getElementById('deposit-amount').value = '';
}

function withdraw() {
    let amount = parseFloat(document.getElementById('withdraw-amount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;

    if (amount > currentBalance) {
        alert("Insufficient funds");
        return;
    }

    currentBalance -= amount;
    localStorage.setItem('balance', currentBalance);
    updateBalanceDisplay();
    updateTransactionHistory({ type: 'Withdrawal', amount: amount });

    alert("Withdrawal successful");
    document.getElementById('withdraw-amount').value = '';
}

function transfer() {
    let amount = parseFloat(document.getElementById('transfer-amount').value);
    let recipientAccount = document.getElementById('recipient-account').value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;

    if (amount > currentBalance) {
        alert("Insufficient funds");
        return;
    }

    if (localStorage.getItem(recipientAccount)) {
        currentBalance -= amount;
        localStorage.setItem('balance', currentBalance);
        updateBalanceDisplay();
        updateTransactionHistory({ type: 'Transfer', amount: amount });

        alert(`Transfer successful to account ${recipientAccount}`);
        document.getElementById('transfer-amount').value = '';
        document.getElementById('recipient-account').value = '';
    } else {
        alert("Recipient account does not exist");
    }
}

// Initialize the balance display when the page loads
document.addEventListener('DOMContentLoaded', updateBalanceDisplay);

// Initialize account details and balance display when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateAccountDetails();
    updateBalanceDisplay();
});



function logout() {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    window.location.href = './login.html'; // Redirect to login page
}
