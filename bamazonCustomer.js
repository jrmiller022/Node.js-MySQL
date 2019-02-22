// Required Items
var inquirer = require("inquirer");
var mysql = require('mysql');
require("dotenv").config();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: "",
    database: 'bamazon_db'
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);
    welcome();
});

//Function to display welcome and log all itmes with quantity and price. 
function welcome() {
    connection.query("SELECT * FROM products", function (error, res) {
        if (error) throw error;

        console.log("BAMAZON Welcomes You!")
        console.log('-------------------------------------------');
        for (var i = 0; i < res.length; i++) {
            console.log("Item Id: " + res[i].item_id + " " + "Product Name: " + res[i].product_name + " " + "Price: " + res[i].price)

        }
        start();
    });
}

function start() {
    connection.query("SELECT * FROM products", function (error, res) {
        if (error) throw error;

        //Prompt user to add ID on what to buy.
        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Please enter the ID number you would like to buy",

                choices: function () {
                    var pickArray = [];
                    for (var i = 0; i < res.length; i++) {

                        pickArray.push(res[i].item_id.toString());
                    }
                    return pickArray;
                },
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like?",

            },
        ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    var itemNum = parseFloat(answer.choice);
                    {
                        if (res[i].item_id === itemNum) {
                            chosenItem = res[i];

                        }
                    }
                }
                if (parseFloat(answer.quantity) < chosenItem.stock_quantity) {
                    connection.query(
                        "UPDATE PRODUCTS SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity - answer.quantity,
                            },
                            {
                                item_id: answer.choice,
                            },
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("Your order was successful. Purchase Price is $" + (chosenItem.price * answer.quantity))
                            connection.end();
                        }
                    );
                } else {
                    console.log("We no longer have that item in stock.  Please try again later." + "\n")
                    console.log("----------------------------------------")
                    console.log("Thanks for shopping with Bamazon!" + "\n")
                    connection.end();
                }
            });
    })
}
