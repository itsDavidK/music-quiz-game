const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    const failure = document.querySelector('#failure');

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            document.getElementById('failure').innerText = "Invalid Username or Password";
            failure.style.visibility = "visible";
        }
    } else {
        document.getElementById('failure').innerText = "Enter your Username & Password";
        failure.style.visibility = "visible";
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);