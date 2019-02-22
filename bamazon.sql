DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

create table products
(
    item_id int(10)
    auto_increment not null,
    product_name varchar
    (50) not null,
    department_name varchar
    (25) not null,
    price decimal
    (10,2) not null,
    stock_quantity int
    (20) not null,
    primary key
    (item_id)
);

    insert into products
        (product_name, department_name, price, stock_quantity)
    values
        ("Dog Food", "Pets", 15.00, 50),
        ("Bicycles", "Sporting goods", 100.00, 25),
        ("Basketballs", "Sporting goods", 20.00, 50),
        ("Hats", "Clothing", 5.00, 25),
        ("Jeep Shirts", "Clothing", 25.75, 55),
        ("Nike Shoes", "Clothing", 69.95, 15),
        ("Pull-up Bar", "Sporting goods", 114.50, 10),
        ("Laptop", "Electronics", 567.89, 15),
        ("TV", "Electronics", 757.95, 13),
        ("Grill", "Outdoors", 399.00, 10);

    SELECT *
    From products;
    