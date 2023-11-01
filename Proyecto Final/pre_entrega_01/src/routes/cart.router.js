import { Router } from "express";
import { cartManager } from "../cartManager.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const allCarts = await cartManager.getCarts();
        if (!allCarts.length) {
            res.status(200).json({ message: 'No se encontraron carritos.' })
        } else {
            res.status(200).json({ message: 'Se encontraron carritos.', allCarts })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const Cart = await cartManager.getCartById(+cid);
        if (!Cart) {
            res.status(400).json({ message: 'No se encontraron carritos.' })
        } else {
            res.status(200).json({ message: 'Se encontró el carrito solicitado.', Cart })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.post('/', async (req, res) => {

    try {
        const NewCart = await cartManager.createCart(req.body);
        res.status(200).json({ message: 'Se creó el carrito.', NewCart })
    } catch (error) {
        res.status(500).json({ message: error })
    }

})

router.post('/:cid/product/:pid', async (req, res) => {

    const {cid, pid} = req.params;
    try {
        const Answer = await cartManager.addProductToCart(+cid, +pid);
        if (Answer === -1) {
            res.status(400).json({ message: 'No se pudo agregar el producto al carrito' })
        } else {
            res.status(200).json({ message: 'Se agregó el producto al carrito.' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

export default router;