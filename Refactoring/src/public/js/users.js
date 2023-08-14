//const roleBtn = document.getElementsByClassName("role-button")
const removeBtn = document.getElementsByClassName("remove-button")

/* const changeUserRole = async (uid, token) => { 
    fetch(`http://localhost:8080/api/users/premium/${uid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json)); 
} */

const removeUser = async (uid, token) => { 
    fetch(`http://localhost:8080/api/users/${uid}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

for (let i = 0; i < removeBtn.length; i++) {
    /* roleBtn[i].preventDefault()
    roleBtn[i].addEventListener('click', async () => {
        const attributes = btn[i].getAttribute('data-users').split(' ')
        const userID = attributes[0]
        const token = attributes[1]
        await changeUserRole(userID, token)
    }) */

    removeBtn[i].addEventListener('click', async () => {
        const attributes = removeBtn[i].getAttribute('data-user').split(' ')
        const userID = attributes[0]
        const token = attributes[1]
        await removeUser(userID, token)
        location.reload()
    })
}



