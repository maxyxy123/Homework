function sumAllNumbers(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAllNumbers(1, 2, 3, 4, 5));
console.log(sumAllNumbers(10, 20, 30));

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

console.log(add(10, 5));
console.log(subtract(10, 5));

function simulateTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve("Task Completed!");
            } else {
                reject("Task Failed!");
            }
        }, 2000);
    });
}

simulateTask()
    .then((message) => console.log(message))
    .catch((error) => console.error(error));

async function runTask() {
    try {
        const result = await simulateTask();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

runTask();

async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        const names = users.map((user) => user.name);
        console.log(names);
    } catch (error) {
        console.error(error);
    }
}

getUsers();

async function renderUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        const userListContainer = document.getElementById("user-list");

        const htmlContent = users
            .map(({ name, email, website }) => {
                return `
                    <div class="user-card">
                        <h3>${name}</h3>
                        <p>Email: ${email}</p>
                        <p>Website: ${website}</p>
                    </div>
                `;
            })
            .join("");

        if (userListContainer) {
            userListContainer.innerHTML = htmlContent;
        }
    } catch (error) {
        console.error(error);
    }
}

renderUsers();