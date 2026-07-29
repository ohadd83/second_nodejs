const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// Home endpoint
app.get('/', (req, res) => {
    res.send('Node.js application is running!');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
