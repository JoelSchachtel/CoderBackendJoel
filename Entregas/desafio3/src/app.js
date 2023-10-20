import express from 'express'
import ProductManager from './productManager.js'

const productManager = new ProductManager('./products.json')

const app = express();

app.get('/products', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

  const products = await productManager.getProducts();

  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid;

  const product = await productManager.getProductById(pid);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});