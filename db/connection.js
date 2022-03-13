const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    // MACBOOK
    password: "2cK@spC4s8afWBFyh4!fDTvXc**khh9yGApj",
    // WINDOWS
    //password: "iDu6rf-towPzk_TehyA2C-8Qkvn2acPduQbcA!G_73GdhU",
    database: "election",
  },
  console.log("Connected to the election database.")
);

module.exports = db;
