function register(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const firstName = document.getElementById('firstName').value;
    const AccountNumber = document.getElementById('AccountNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const accountType = document.getElementById('accountType').value;

    const user = {
        name: firstName,
        acno: AccountNumber,
        mail: email,
        pswd1: password,
        pswd2: confirmPassword,
        accountType: accountType
    };

    if (localStorage.getItem(user.acno)) {
        alert("Account already exists");
    } else {
        if (user.pswd1 !== user.pswd2) {
            alert("Passwords do not match");
        } else {
            localStorage.setItem(user.acno, JSON.stringify(user));
            alert("Account Created Successfully");
            window.location.href = 'login.html'; // Redirect to login page
        }
    }
}
