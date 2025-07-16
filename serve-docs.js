const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Serve static files from docs directory
app.use(express.static('docs'));

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Handle all routes to serve index.html (for docsify routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`📚 Documentation server running at:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`   http://127.0.0.1:${PORT}`);
    console.log(`\n✨ Open your browser and navigate to the URL above`);
    console.log(`\n🛑 Press Ctrl+C to stop the server`);
}); 