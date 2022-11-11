const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#usernameSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();
    const passwordConfirm = document.querySelector('#passwordConfirm').value.trim();
    const failure = document.querySelector('#failure');

    if (username && password && passwordConfirm) {
        if (password.length < 8)
        {
            document.getElementById('failure').innerText = "Your password must be atleast 8 characters";
            failure.style.visibility = "visible";
        }
        if (password == passwordConfirm) {
            const response = await fetch('/api/users/create', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,

                }),
                headers: { 'Content-Type': 'application/json' },
            });
            const innitialval = 0;
            await fetch('/api/profile/create', {
                method: 'POST',
                body: JSON.stringify({
                    userRight: innitialval,
                    userWrong: innitialval,
                    totalGame: innitialval,
                    userPrcnt: innitialval
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {

                document.location.replace('/');
            } else {
                document.getElementById('failure').innerText = "This Username is already in Use";
                failure.style.visibility = "visible";
            }


        } else {
            document.getElementById('failure').innerText = "Both password should be matched!";
            failure.style.visibility = "visible";
        }
    } else {
        document.getElementById('failure').innerText = "Don't leave anything empty!";
                failure.style.visibility = "visible";
    }
}

document.querySelector(".signin-form").addEventListener('submit', signupFormHandler)