const signupFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#userName-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (userName && password) {
        const response = await fetch ('/api/users/create', {
            method: 'POST',
            body: JSON.stringify({userName: userName, 
                password: password}),
            headers: { 'Content-Type': 'application/json' },
        }); 

        if (response.ok) {
        document.location.replace('/');
        } else {
            alert('use different username or password')
        }
    }
}

document.querySelector(".login-form").addEventListener('submit', signupFormHandler)