

let choice;

do {
    choice = Number(
        prompt(
            "CHỌN BÀI TẬP:\n" +
            "1. Phân loại số âm, số dương, số 0\n" +
            "2. In các số chẵn từ 1 đến n\n" +
            "3. Chọn đồ uống bằng switch-case\n" +
            "4. Tính tổng đến khi nhập số 0\n" +
            "5. Nhập số từ 1 đến 10 bằng do-while\n" +
            "6. In hình chữ nhật bằng dấu sao\n" +
            "7. Kiểm tra điều kiện cho vay\n" +
            "8. Sử dụng continue và break\n" +
            "9. Kiểm tra số nguyên tố\n" +
            "10. Game đoán số\n" +
            "0. Thoát chương trình"
        )
    );

    console.clear();

    switch (choice) {
        case 1:
            classifyNumber();
            break;

        case 2:
            printEvenNumbers();
            break;

        case 3:
            chooseDrink();
            break;

        case 4:
            calculateSum();
            break;

        case 5:
            inputValidNumber();
            break;

        case 6:
            printRectangle();
            break;

        case 7:
            checkLoanCondition();
            break;

        case 8:
            useContinueAndBreak();
            break;

        case 9:
            checkPrimeNumber();
            break;

        case 10:
            guessingGame();
            break;

        case 0:
            console.log("Đã thoát chương trình.");
            alert("Đã thoát chương trình.");
            break;

        default:
            alert("Lựa chọn không hợp lệ. Vui lòng chọn lại!");
    }
} while (choice !== 0);




function classifyNumber() {
    const number = Number(prompt("Nhập vào một số bất kỳ:"));

    if (Number.isNaN(number)) {
        console.log("Dữ liệu nhập vào không hợp lệ.");
    } else if (number > 0) {
        console.log("Số dương");
    } else if (number < 0) {
        console.log("Số âm");
    } else {
        console.log("Số không");
    }
}




function printEvenNumbers() {
    const n = Number(prompt("Nhập số nguyên dương n:"));

    if (!Number.isInteger(n) || n <= 0) {
        console.log("Vui lòng nhập một số nguyên dương.");
        return;
    }

    console.log(`Các số chẵn từ 1 đến ${n}:`);

    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            console.log(i);
        }
    }
}




function chooseDrink() {
    const drinkChoice = Number(
        prompt(
            "DANH SÁCH ĐỒ UỐNG:\n" +
            "1. Cafe\n" +
            "2. Cam vắt\n" +
            "3. Trà sữa\n" +
            "4. Coca\n\n" +
            "Nhập số thứ tự món:"
        )
    );

    switch (drinkChoice) {
        case 1:
            console.log("Bạn đã chọn: Cafe");
            break;

        case 2:
            console.log("Bạn đã chọn: Cam vắt");
            break;

        case 3:
            console.log("Bạn đã chọn: Trà sữa");
            break;

        case 4:
            console.log("Bạn đã chọn: Coca");
            break;

        default:
            console.log("Món ăn không tồn tại");
    }
}



function calculateSum() {
    let sum = 0;
    let number;

    while (true) {
        number = Number(
            prompt("Nhập một số để cộng vào tổng. Nhập 0 để kết thúc:")
        );

        if (Number.isNaN(number)) {
            alert("Dữ liệu không hợp lệ. Vui lòng nhập số!");
            continue;
        }

        if (number === 0) {
            break;
        }

        sum += number;
    }

    console.log(`Tổng cuối cùng là: ${sum}`);
}



function inputValidNumber() {
    let number;

    do {
        number = Number(prompt("Nhập một số trong khoảng từ 1 đến 10:"));

        if (
            Number.isNaN(number) ||
            !Number.isInteger(number) ||
            number < 1 ||
            number > 10
        ) {
            alert("Số không hợp lệ. Vui lòng nhập lại!");
        }
    } while (
        Number.isNaN(number) ||
        !Number.isInteger(number) ||
        number < 1 ||
        number > 10
    );

    console.log(`Số hợp lệ bạn đã nhập là: ${number}`);
}




function printRectangle() {
    const width = Number(prompt("Nhập chiều rộng w:"));
    const height = Number(prompt("Nhập chiều cao h:"));

    if (
        !Number.isInteger(width) ||
        !Number.isInteger(height) ||
        width <= 0 ||
        height <= 0
    ) {
        console.log("Chiều rộng và chiều cao phải là số nguyên dương.");
        return;
    }

    console.log(`Hình chữ nhật ${width} x ${height}:`);

    for (let row = 1; row <= height; row++) {
        let line = "";

        for (let column = 1; column <= width; column++) {
            line += "* ";
        }

        console.log(line);
    }
}



function checkLoanCondition() {
    const salary = Number(
        prompt("Nhập mức lương hàng tháng, đơn vị triệu đồng:")
    );

    const age = Number(prompt("Nhập độ tuổi:"));

    const badDebtInput = prompt(
        "Bạn có nợ xấu không? Nhập Yes hoặc No:"
    );

    if (
        Number.isNaN(salary) ||
        Number.isNaN(age) ||
        badDebtInput === null
    ) {
        console.log("Thông tin nhập vào không hợp lệ.");
        return;
    }

    const badDebt = badDebtInput.trim().toLowerCase();

    if (badDebt !== "yes" && badDebt !== "no") {
        console.log("Trạng thái nợ xấu chỉ được nhập Yes hoặc No.");
        return;
    }

    const isEligible =
        salary > 15 &&
        age >= 18 &&
        age <= 60 &&
        badDebt === "no";

    if (isEligible) {
        console.log("Khách hàng đủ điều kiện vay.");
    } else {
        console.log("Khách hàng không đủ điều kiện vay.");
    }
}


function useContinueAndBreak() {
    let sum = 0;
    const printedNumbers = [];

    for (let i = 1; i <= 50; i++) {
        // Không in những số chia hết cho 5
        if (i % 5 === 0) {
            continue;
        }

        // Cộng số hiện tại vào tổng
        sum += i;
        printedNumbers.push(i);

        // Dừng khi tổng vượt quá 200
        if (sum > 200) {
            break;
        }
    }

    console.log("Danh sách số đã in:");
    console.log(printedNumbers.join(", "));
    console.log(`Tổng cuối cùng: ${sum}`);
}




function checkPrimeNumber() {
    const number = Number(prompt("Nhập một số nguyên bất kỳ:"));

    if (!Number.isInteger(number)) {
        console.log("Vui lòng nhập một số nguyên.");
        return;
    }

    let isPrime = true;

    if (number < 2) {
        isPrime = false;
    } else {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                isPrime = false;
                break;
            }
        }
    }

    if (isPrime) {
        console.log(`${number} là số nguyên tố`);
    } else {
        console.log(`${number} không phải số nguyên tố`);
    }
}

function guessingGame() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const maximumAttempts = 5;
    let isCorrect = false;

    console.log("GAME ĐOÁN SỐ");
    console.log("Máy tính đã chọn một số từ 1 đến 100.");
    console.log(`Bạn có tối đa ${maximumAttempts} lần đoán.`);

    for (let attempt = 1; attempt <= maximumAttempts; attempt++) {
        const guessedNumber = Number(
            prompt(
                `Lần đoán thứ ${attempt}/${maximumAttempts}.\n` +
                "Nhập một số từ 1 đến 100:"
            )
        );

        if (
            !Number.isInteger(guessedNumber) ||
            guessedNumber < 1 ||
            guessedNumber > 100
        ) {
            alert("Vui lòng nhập số nguyên từ 1 đến 100.");
            console.log(`Lần ${attempt}: Dữ liệu không hợp lệ.`);
            continue;
        }

        if (guessedNumber === randomNumber) {
            console.log(
                `Chúc mừng! Bạn đã đoán đúng số ${randomNumber}.`
            );

            alert("Chúc mừng! Bạn đã đoán đúng.");
            isCorrect = true;
            break;
        } else if (guessedNumber > randomNumber) {
            console.log(
                `Lần ${attempt}: ${guessedNumber} - Số bạn đoán quá lớn`
            );

            alert("Số bạn đoán quá lớn");
        } else {
            console.log(
                `Lần ${attempt}: ${guessedNumber} - Số bạn đoán quá nhỏ`
            );

            alert("Số bạn đoán quá nhỏ");
        }
    }

    if (!isCorrect) {
        console.log(`Game Over! Số đúng là ${randomNumber}.`);
        alert(`Game Over! Số đúng là ${randomNumber}.`);
    }
}