const deleteEl = document.getElementsByClassName("delete");

const deleteBlogFormHandler = async (event) => {
    const deleteData = event.target.getAttribute("data-id");
    event.preventDefault();
    const response = await fetch(`/api/quiz/delete/${deleteData}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: deleteData,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    // document.location.replace('/dashboard');
    location.reload();
}

for(let i = 0 ; i < deleteEl.length; i++) {
    deleteEl[i].addEventListener('click', deleteBlogFormHandler)
}

