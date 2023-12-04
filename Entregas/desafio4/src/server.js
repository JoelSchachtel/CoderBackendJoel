import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';
import {__dirname} from './utils.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import handlebars from 'express-handlebars';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
app.use('/', viewsRouter);


const httpServer = app.listen(8080, () => {
    console.log('Servidor corriendo en puerto 8080...');
})

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    })
})