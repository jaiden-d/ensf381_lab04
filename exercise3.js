const userGrid = document.getElementById("userGrid");

const viewToggleBtn = document.getElementById("viewToggleBtn");

const deleteIdInput = document.getElementById("deleteIdInput");
const deleteBtn = document.getElementById("deleteBtn");

const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");

let users = [];

async function retrieveData() {
    try{
        const response = await fetch("https://69a1e5192e82ee536fa28342.mockapi.io/users_api")
        const data = await response.json();
        users = data;
        console.log(users);
        render(users);
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }

}

function render(userObjects) {
    userGrid.innerHTML = "";

    userObjects.forEach(user => {
        const card = `
        <article class="user-card">
            <h3>${user.first_name ?? ""}</h3>
            <p>first_name: ${user.first_name ?? ""}</p>
            <p>user_group: ${user.user_group ?? ""}</p>
            <p>id: ${user.id ?? ""}</p>
        </article>
        `;

        userGrid.innerHTML += card;
    });
}

viewToggleBtn.addEventListener("click", () => {
    if (userGrid.classList.contains("grid-view")) {
        userGrid.classList.remove("grid-view");
        userGrid.classList.add("list-view");
    } else {
        userGrid.classList.remove("list-view");
        userGrid.classList.add("grid-view");
    }
});

sortByGroupBtn.addEventListener("click", () => {
    users.sort((a,b) => a.user_group - b.user_group);
    render(users);
});

sortByIdBtn.addEventListener("click", () => {
    users.sort((a,b) => a.id - b.id);
    render(users);
})

deleteBtn.addEventListener("click", async () => {
    const id = deleteIdInput.value.trim() ;
    
    if(!id){
        console.error("Invalid user id entered.");
        return;
    }

    try{
        const response = await fetch('https://69a1e5192e82ee536fa28342.mockapi.io/users_api/${id}', { // wrong url?
            method: "DELETE"
        });
        if (response.ok) {
            // remove user from local array
            users = users.filter(user => user.id !== parseInt(id));
            render(users);
            console.log("User with id ${id} deleted.");
        } else {
            console.error("Error deleting user with id ${id}: ${response.statusText}" );
        }
    } catch (error){
        console.error("Error deleting user: ", error);
    }
})

document.addEventListener("DOMContentLoaded", retrieveData);