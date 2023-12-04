import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        if (!products.length) {
            res.status(200).json({ message: 'No se encontraron productos cargados.' })
        } else {
            res.status(200).json({ message: 'Productos encontrados.', products });
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productsManager.getProductById(+pid);
        if (!product) {
            res.status(404).json({ message: 'No se encontro el producto con el ID solicitado.' })
        } else {
            res.status(200).json({ message: 'Producto encontrado.', product });
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        res.status(400).json({ message: 'Faltan datos para crear el producto.' })
    }
    try {
        const newProduct = await productsManager.addProduct(req.body)
        console.log(newProduct);
        res.status(200).json({ message: 'Producto creado.', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const response = await productsManager.deleteProduct(+pid);
        if (response === -1) {
            res.status(404).json({ message: 'No se encontro el producto con el ID solicitado.' })
        } else {
            res.status(200).json({ message: 'Producto eliminado.' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const response = await productsManager.updateProduct(+pid, req.body);
        if (response === -1) {
            res.status(404).json({ message: 'No se encontro el producto con el ID solicitado.' })
        } if (id) {
            res.status(400).json({ message: 'El ID no puede ser modificado.' })
        }
        else {
            res.status(200).json({ message: 'Producto actualizado.' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }



});

export default router;