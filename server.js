const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();
//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "2cK@spC4s8afWBFyh4!fDTvXc**khh9yGApj",
    database: "election",
  },
  console.log("Connected to the election database.")
);

// Get all candidates
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get a single candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = "SELECT * FROM candidates WHERE id = ?";
  const params = [req.params.id];

  // query database
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// Delete a single candidate
app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found.",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// listen on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
