const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensure this is here

let currentDBConnection = null;
const connectDB = async (dbName) => {
    try {
        if (currentDBConnection === dbName) {
            console.log(`Already connected to ${dbName} database`);
            return; // No need to disconnect and reconnect if already connected to the same DB
        }

        // Disconnect from the current database if different from the requested one
        if (currentDBConnection) {
            await mongoose.disconnect();
            console.log(`Disconnected from ${currentDBConnection} database`);
        }

        // Connect to the new database
        const dbURI = `${process.env.MONGO_URI}/${dbName}`;
        await mongoose.connect(dbURI);
        currentDBConnection = dbName;
        console.log(`Connected to ${dbName} database`);
    } catch (err) {
        console.error(`Error connecting to ${dbName} database`, err);
        throw new Error('Database connection error');
    }
};

// Middleware for dynamic DB switching
const dbSwitcher = (dbName) => async (req, res, next) => {
    try {
        await connectDB(dbName);
        next();
    } catch (err) {
        res.status(500).send('Failed to connect to the database');
    }
};

// Initial default connection to 'defaultdb'
connectDB('defaultdb').catch(err => {
    console.error('Failed to connect to defaultdb on startup', err);
});

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/default', (req, res) => {
    res.send('You are connected to the default database');
});

// Dynamic route for 'sumit' database
app.use('/api/sumit', dbSwitcher('sumit'), require('./routes/sumit'));

// Dynamic route for 'nishu' database
app.use('/api/nishu', dbSwitcher('nishu'), require('./routes/Nishu'));

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
