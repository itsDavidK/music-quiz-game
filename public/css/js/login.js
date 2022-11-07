const loginFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#userName-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (userName && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                userName: userName,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);