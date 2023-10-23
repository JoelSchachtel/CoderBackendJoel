const express = require('express');
const fs = require('fs');
const path = './fs/products.json';
const format = 'utf-8';
const products = fs.readFileSync(path, format);
const parsedProducts = JSON.parse(products);

const app = express();

app.get('/products', (req, res) => {
    const limit = req.query.limit;

    if (limit) {
        res.send(parsedProducts.slice(0, limit))
    } else {
        res.send(parsedProducts)
    };
})
app.get('/products/:pid', (req, res) => {
    const productID = req.params.pid 
    
    const product = parsedProducts.find(product => product.id == productID)
    
    if(!product) res.send(`<h2>Error: Product not found.</h2>`)
    else res.send(product)
})

app.listen(8080, () => console.log('Server is running ...'))