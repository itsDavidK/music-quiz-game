const logout = async () => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

};

document.querySelector('#logout').addEventListener('click', logout);
