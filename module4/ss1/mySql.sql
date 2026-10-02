


-- BÀI 1: TẠO DATABASE VÀ BẢNG BOOKS


CREATE DATABASE LibraryDB;

USE LibraryDB;

CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(100),
    PublishedYear INT
);

DESCRIBE Books;


-- BÀI 2: INSERT, UPDATE, DELETE, SELECT


INSERT INTO Books (Title, Author, PublishedYear)
VALUES
    ('Lập trình Java', 'Nguyen Van A', 2020),
    ('Lập trình Web', 'Tran Van B', 2022),
    ('Clean Code', 'Robert C. Martin', 2008);

SELECT * FROM Books;


UPDATE Books
SET PublishedYear = 2021
WHERE BookID = 1;

SELECT * FROM Books
WHERE BookID = 1;


DELETE FROM Books
WHERE BookID = 3;

SELECT * FROM Books;



-- BÀI 3: SELECT + WHERE + LIKE + ORDER BY + LIMIT


INSERT INTO Books (Title, Author, PublishedYear)
VALUES
    ('Lập trình Python', 'Nguyen Van A', 2023),
    ('Database System', 'Le Van C', 2024),
    ('Lập trình NodeJS', 'Pham Van D', 2022),
    ('Software Engineering', 'Nguyen Van A', 2019);


-- 1. Sách xuất bản sau năm 2020
SELECT *
FROM Books
WHERE PublishedYear > 2020;


-- 2. Tác giả là Nguyen Van A
-- HOẶC tiêu đề bắt đầu bằng "Lập trình"
SELECT *
FROM Books
WHERE Author = 'Nguyen Van A'
   OR Title LIKE 'Lập trình%';


-- 3. Sắp xếp năm giảm dần,
-- nếu trùng năm thì tiêu đề tăng dần,
-- chỉ lấy 2 bản ghi đầu
SELECT *
FROM Books
ORDER BY PublishedYear DESC, Title ASC
LIMIT 2;



-- BÀI 4: ALTER TABLE VÀ TRUNCATE


ALTER TABLE Books
ADD COLUMN Price DECIMAL(10, 2);

DESCRIBE Books;


ALTER TABLE Books
MODIFY COLUMN Author VARCHAR(255);

DESCRIBE Books;


TRUNCATE TABLE Books;

SELECT * FROM Books;

DESCRIBE Books;



-- BÀI 5: FOREIGN KEY VÀ JOIN


CREATE DATABASE SalesDB;

USE SalesDB;


CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255)
);


CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    OrderDate DATETIME,
    CustomerID INT,

    CONSTRAINT FK_Orders_Customers
        FOREIGN KEY (CustomerID)
        REFERENCES Customers(CustomerID)
);


-- Thêm 2 khách hàng
INSERT INTO Customers (FullName, Email)
VALUES
    ('Nguyen Van A', 'nguyenvana@gmail.com'),
    ('Tran Thi B', 'tranthib@gmail.com');

SELECT * FROM Customers;


-- Thêm 3 đơn hàng
-- CustomerID = 1 có 2 đơn
-- CustomerID = 2 có 1 đơn
INSERT INTO Orders (OrderDate, CustomerID)
VALUES
    ('2026-10-01 08:30:00', 1),
    ('2026-10-01 14:20:00', 1),
    ('2026-10-02 09:00:00', 2);

SELECT * FROM Orders;


-- Hiển thị mã đơn hàng,
-- ngày đặt hàng,
-- tên khách hàng
SELECT
    o.OrderID,
    o.OrderDate,
    c.FullName
FROM Orders AS o
INNER JOIN Customers AS c
    ON o.CustomerID = c.CustomerID;
