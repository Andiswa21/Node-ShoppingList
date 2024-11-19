const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/shopping-list.json');


const readShoppingList = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));


const writeShoppingList = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));


const getShoppingList = (req, res) => {
    const shoppingList = readShoppingList();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(shoppingList));
};


const addShoppingItem = (req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        const newItem = JSON.parse(body);
        const shoppingList = readShoppingList();
        shoppingList.push(newItem);
        writeShoppingList(shoppingList);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newItem));
    });
};


const updateShoppingItem = (req, res) => {
    const id = parseInt(req.url.split('/').pop());
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        const updatedData = JSON.parse(body);
        const shoppingList = readShoppingList();
        const itemIndex = shoppingList.findIndex(item => item.id === id);

        if (itemIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Item not found' }));
        } else {
            shoppingList[itemIndex] = { ...shoppingList[itemIndex], ...updatedData };
            writeShoppingList(shoppingList);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(shoppingList[itemIndex]));
        }
    });
};


const deleteShoppingItem = (req, res) => {
    const id = parseInt(req.url.split('/').pop());
    const shoppingList = readShoppingList();
    const updatedList = shoppingList.filter(item => item.id !== id);

    if (shoppingList.length === updatedList.length) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Item not found' }));
    } else {
        writeShoppingList(updatedList);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Item ${id} deleted successfully` }));
    }
};

module.exports = {
    getShoppingList,
    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem
};
