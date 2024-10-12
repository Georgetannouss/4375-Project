const express = require('express');
const mariadb = require('mariadb');


// Create an Express application
const app = express();
const cors = require('cors');  // Add this to import cors

// Use CORS middleware
app.use(cors());  // Enable CORS for all routes
// Middleware to parse JSON bodies in requests
app.use(express.json());

// Create a MariaDB connection pool with public key retrieval allowed
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'raza8329076203',  // Your MySQL root password
    database: 'real_estate',     // Your database name
    connectionLimit: 5,
    allowPublicKeyRetrieval: true // This option allows the retrieval of the public key
});

// GET all listings
app.get('/listings', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM listings');
        res.json(rows);  // Correctly format the JSON response
    } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).send('Error fetching listings');
    } finally {
        if (conn) conn.end(); // Close the connection
    }
});
// POST a new listing
app.post('/listings', async (req, res) => {
    const { name, price, address, image } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'INSERT INTO listings (name, price, address, image) VALUES (?, ?, ?, ?)', 
            [name, price, address, image]
        );
        
        // Convert BigInt (if result.insertId is a BigInt) to string
        const insertId = result.insertId.toString();

        res.json({ message: 'Listing added', id: insertId }); // Send back id as a string
    } catch (err) {
        console.error('Error adding listing:', err.message, err.stack);  // Log more error details
        res.status(500).send('Error adding listing');
    } finally {
        if (conn) conn.end();
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
