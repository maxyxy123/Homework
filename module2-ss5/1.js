
const userInput = document.getElementById('user-input');
const keyDisplay = document.getElementById('key-display');

userInput.addEventListener('keydown', (e) => {

    keyDisplay.textContent = e.key;
});



const itemList = document.getElementById('item-list');
const btnAdd = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');


btnAdd.addEventListener('click', () => {
    const newItem = document.createElement('li');
    newItem.textContent = 'New Item';
    itemList.appendChild(newItem);
});


btnRemove.addEventListener('click', () => {
    const lastItem = itemList.lastElementChild;
    if (lastItem) {
        lastItem.remove();
    }
});



const registerForm = document.getElementById('register-form');
const formLog = document.getElementById('form-log');

registerForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const usernameVal = document.getElementById('username').value;
    const emailVal = document.getElementById('email').value;

    const formData = {
        username: usernameVal,
        email: emailVal
    };


    console.log('--- BÀI 3: Form Data ---');
    console.log(formData);

    formLog.textContent = `Console Output: ${JSON.stringify(formData)}`;
});



const deleteButtons = document.querySelectorAll('.btn-delete');

deleteButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        const parentLi = e.target.parentElement;
        parentLi.remove();
    });
});



const parentBox = document.getElementById('parent-box');
const childBtn = document.getElementById('child-btn');
const eventLog = document.getElementById('event-log');


parentBox.addEventListener('click', () => {
    const msg = '-> Sự kiện PARENT [Div] vừa chạy!';
    console.log(msg);
    eventLog.textContent = msg;
});


childBtn.addEventListener('click', (e) => {

    e.stopPropagation();

    const msg = '-> Sự kiện CHILD [Button] vừa chạy (Đã dừng nổi bọt lên Parent)!';
    console.log(msg);
    eventLog.textContent = msg;
});



const colors = ["red", "blue", "green", "yellow", "purple"];
const btnChangeColor = document.getElementById('btn-change-color');
const colorCode = document.getElementById('color-code');

btnChangeColor.addEventListener('click', () => {

    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];

    document.body.style.backgroundColor = selectedColor;

    colorCode.textContent = selectedColor;
});