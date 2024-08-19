function login(event) {
    event.preventDefault(); // Prevent the default form submission

    const firstName = document.getElementById('firstName').value.trim();
    const password = document.getElementById('password').value.trim();
    
    let userAccount = null;

    // Find the user's account by checking all stored accounts
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let userData;

        // Try to parse the item; if it fails, continue to the next item
        try {
            userData = JSON.parse(localStorage.getItem(key));
        } catch (error) {
            console.warn(`Skipping key "${key}" because it does not contain valid JSON`);
            continue;
        }

        // If userData is valid and matches the credentials
        if (userData && userData.name === firstName && userData.pswd1 === password) {
            userAccount = userData;
            break;
        }
    }

    // If the userAccount was found, log in, otherwise show an error
    if (userAccount) {
        localStorage.setItem('loggedInUser', JSON.stringify(userAccount));
        alert('Login Successful');
        window.location.href = './dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}
