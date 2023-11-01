import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';
import {__dirname} from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);

app.use(express.static(__dirname+'/public'));

app.listen(8080, () => {
    console.log('Servidor corriendo en puerto 8080...');
})