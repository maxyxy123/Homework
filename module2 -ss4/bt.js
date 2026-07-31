const fruits = ["Apple", "Banana", "Orange", "Mango", "Grape"];
console.log(fruits[0]);
console.log(fruits[fruits.length - 1]);
fruits[1] = "Strawberry";
console.log(fruits);

function sayHello(userName) {
  console.log(`Hello ${userName}, lalalalala`);
}
sayHello("Minh");

const students = [];
students.push("An", "Bình", "Cường");
students.unshift("Dũng");
students.pop();
console.log(students);

function calculateSum(numA, numB) {
  return numA + numB;
}
const result = calculateSum(15, 25);
console.log(result);

const numbers = [10, 20, 30, 40, 50];

function checkNumber(searchValue) {
  if (numbers.includes(searchValue)) {
    console.log(numbers.indexOf(searchValue));
  } else {
    console.log("Not found");
  }
}

checkNumber(30);
checkNumber(99);

let colors = ["Red", "Green", "Blue"];
colors.splice(1, 1, "Yellow", "Pink");
console.log(colors);

const scores = [1, 2, 3, 4, 5];
scores.forEach((score) => {
  console.log(score ** 2);
});

const doubledScores = scores.map((score) => score * 2);
console.log(doubledScores);

const ages = [15, 20, 12, 18, 25, 30, 10];

function getAdults(arr) {
  return arr.filter((age) => age >= 18);
}

const adults = getAdults(ages);
console.log(adults);

const prices = [100, 200, 300, 400];
const totalPrice = prices.reduce((acc, current) => acc + current, 0);
const vat = totalPrice * 0.1;
const finalTotal = totalPrice + vat;

console.log(totalPrice);
console.log(vat);
console.log(finalTotal);

let tasks = [];

function addTask(title) {
  tasks.push(title);
}

function removeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
}

function displayTasks() {
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}

addTask("task moi");
addTask("new +1");
addTask("new tasks +2");
displayTasks();
removeTask(1);
displayTasks();
