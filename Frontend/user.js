const Base_URL = 'http://localhost:8000';
window.onload = async () => {

    const response = await axios.get(`${Base_URL}/users`);
    console.log('response', response);
    const userDOM = document.getElementById('user');
    let htmlData = '<div>';
    for (let i =0 ; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<div>
        ${user.firstName} ${user.lastName} 
        <button class='edit' data-id='${user.id}'>Edit</button>
        <button class='delete' data-id='${user.id}'>Delete</button>
        </div>`
    }
    htmlData += '</div>';
    userDOM.innerHTML = htmlData;

    const deleteDoms = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteDoms.length; i++) {
        deleteDoms[i].addEventListener('click', async (e) => {
            const id = event.target.dataset.id;
            try {
                await axios.delete(`${Base_URL}/users/${id}`);
                loadData();
            }catch (error) {
                console.log('deleting error', error);
            }
        });
    }

}