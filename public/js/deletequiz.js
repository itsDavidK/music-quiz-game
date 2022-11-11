const deleteEl = document.querySelector("#delete");
const deleteData = deleteEl.getAttribute("data-id");

const deleteBlogFormHandler = async (event) => {
    event.preventDefault();
    console.log(deleteData)
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

deleteEl.addEventListener('click', deleteBlogFormHandler)

const level = fetch('/api/current-user')
.then(res => {
    res.json(); 
}).then(data => {
    console.log(data);
})