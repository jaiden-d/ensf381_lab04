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

})

sortByIdBtn.addEventListener("click", () => {

})

deleteBtn.addEventListener("click", () => {
    
})

document.addEventListener("DOMContentLoaded", retrieveData);