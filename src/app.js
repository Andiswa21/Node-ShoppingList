const http = require('http');
const {
    getShoppingList,
    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem
} = require('./controllers/shoppingListControllers');

const PORT = 3000;

const server = http.createServer((req, res) => {
    
    if (req.url === '/shopping-list' && req.method === 'GET') {
        getShoppingList(req, res);
    } 
    
    
    else if (req.url === '/shopping-list' && req.method === 'POST') {
        addShoppingItem(req, res);
    } 
    
    
    else if (req.url.startsWith('/shopping-list') && req.method === 'PUT') {
        updateShoppingItem(req, res);
    } 
    
    
    else if (req.url.startsWith('/shopping-list') && req.method === 'DELETE') {
        deleteShoppingItem(req, res);
    } 
    
   
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
