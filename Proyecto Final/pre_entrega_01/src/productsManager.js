import fs from 'fs';

class ProductsManager {

    constructor(path) {
        this.path = path;
    };
    async getProducts() {
        try {
            if (fs.existsSync(this.path) && fs.readFileSync(this.path, 'utf-8') === '') {
                return [];
            } else {
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            }
        } catch (error) {
            return error;
        }
    };
    async addProduct(obj) {
        try {
            const products = await this.getProducts();
            let id;
            if (!products.length) {
                id = 1;
            } else {
                id = products[products.length - 1].id + 1;
            }
            const newProducts = { id, ...obj };
            products.push(newProducts);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return newProducts;
        } catch (error) {
            return error
        }
    };
    async getProductById(idProduct) {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === idProduct);
            return product
        } catch (error) {
            return error
        }
    };
    async deleteProduct(idProduct) {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === idProduct);
            if(!product){
                return -1
            }
            const newArrayProducts = products.filter(product => product.id !== idProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
            return 1
        } catch (error) {
            return error
        }
    };
    async updateProduct(idProduct, obj) {
        try {
            const products = await this.getProducts();
            const index = users.findIndex((product) => product.id === idProduct);
            if (index === -1) {
                return -1;
            }
            const product = products[index];
            products[index] = { ...product, ...obj };
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return 1;
        }   catch (error) {
            return error
        }
    };
};

export const productsManager = new ProductsManager('./src/products.json');