import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(carts);
            } else {
                return [];
            }
        } catch (error) {
            return error
        }
    }

    async getCartById(cid) {
        try {
            const savedCarts = await this.getCarts();
            const cartAux = savedCarts.find(cart => cart.id === cid);
            return cartAux;
        } catch (error) {
            return error;
        }
    }

    async createCart(productList) {
        try {
            const savedCarts = await this.getCarts();
            let idCart
            if (!savedCarts.length) {
                idCart = 1
            } else {
                idCart = savedCarts[savedCarts.length - 1].id + 1
            }
            const newCart = { id, ...productList }
            savedCarts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(savedCarts));
            return newCart;
        } catch (error) {
            return error
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const savedCarts = await this.getCarts();
            const cartAux = savedCarts.find(cart => cart.id === +cid);
            if (cartAux) {
                const productIndex = cartAux.productList.findIndex(product => product.id === +pid);
                if (productIndex === -1) {
                    cartAux.productList.push({ id_product: +pid, quantity: 1 })
                } else {
                    cartAux.productList[productIndex].quantity++
                }
                const cartIndex = savedCarts.findIndex(cart => cart.id === cid);
                savedCarts[cartIndex] = cartAux;
                await fs.promises.writeFile(this.path, JSON.stringify(savedCarts));
                return 1
            } else {
                return -1
            }
        } catch (error) {
            return error
        }
    }

}

export const cartManager = new CartManager('./carts.json');