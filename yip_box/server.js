const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Initialize SQLite Database
db.serialize(() => {
  db.run("CREATE TABLE yips (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, message TEXT)");
});

// Get Yips
app.get('/api/yips', (req, res) => {
  db.all("SELECT * FROM yips", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Post Yip
app.post('/api/yips', (req, res) => {
  const { username, message } = req.body;
  db.run("INSERT INTO yips (username, message) VALUES (?, ?)", [username, message], function(err) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.status(201).json({ id: this.lastID, username, message });
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/yip_box.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
