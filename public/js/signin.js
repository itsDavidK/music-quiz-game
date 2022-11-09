const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#usernameSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();
    const passwordConfirm = document.querySelector('#passwordConfirm').value.trim();

    if (username && password && passwordConfirm) {
        if (password == passwordConfirm) {
            const response = await fetch('/api/users/create', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                await fetch('/api/profile/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        userRight: 0,
                        userwrong: 0
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });
                document.location.replace('/');
            } else {
                alert('use different username or password')
            }


        }
    } else {
        alert('No empty Blank!')
    }
}

document.querySelector(".signin-form").addEventListener('submit', signupFormHandler)