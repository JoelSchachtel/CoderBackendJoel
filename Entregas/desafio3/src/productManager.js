import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async (newProduct) => {
        try {
            const validProduct = this.validateProduct(newProduct);
            const products = await this.getProducts();
            const repeatedCode = products.find(
                (product) => product.code === newProduct.code
            );
            if (!validProduct && repeatedCode) {
                return console.error(
                    "Carga incorrecta. El código del producto que intenta agregar ya existe."
                );
            }
            newProduct.id = products.length
                ? products[products.length - 1].id + 1
                : 1;

            products.push(newProduct);

            fs.promises.writeFile(this.path, JSON.stringify(products)).then(() => {
                return console.log("Producto cargado correctamente.");
            });
        } catch (error) {
            console.log(error);
        }
    };

    validateProduct(product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock
        );
    };

    getProductsFromFile = async () => {
        try {
            if (!fs.existsSync(this.path)) {
                const products = [];

                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return products;
            }

            const products = JSON.parse(await fs.promises.readFile(this.path));

            return products;
        } catch (error) {
            console.error(error);
        }
    };

    getProducts = async () => {
        try {
            const products = await this.getProductsFromFile();
            return products;
        } catch (error) {
            console.error(error);
        }
    };


    async loadProducts() {
        try {
            const productsFilePath = './products.json'
          const productsData = await fs.promises.readFile(productsFilePath);
          const products = JSON.parse(productsData);
          this.products = products || {};
        } catch (error) {
          console.error(error);
        }
      };
    
      async getProductById(id) {
        await this.loadProducts();
        const productsArray = Object.values(this.products);
        for (const product of productsArray) {
          if (product.id === id) {
            return product;
          }
        }
      };
    

    updateProductById = async (id, newProductInfo) => {
        try {
            if (newProductInfo.id || newProductInfo.code) {
                throw Error("No puedes cambiar el código.");
            }

            let product = { ...(await this.getProductById(id)) };

            const products = await this.getProducts();

            let found_index;

            products.find((product, index) => {
                if (product.id === id) {
                    found_index = index;
                }
            });

            product = { ...product, ...newProductInfo };

            products[found_index] = product;

            fs.promises.writeFile(this.path, JSON.stringify(products)).then(() => {
                return console.log("Producto actualizado correctamente.");
            });
        } catch (error) {
            console.error(error);
        }
    };

    deleteProductById = async (id) => {
        try {
            const products = await this.getProducts();

            await this.getProductById(id);

            let found_index;

            products.find((product, index) => {
                if (product.id === id) {
                    found_index = index;
                }
            });

            products.splice(found_index, 1);

            fs.promises.writeFile(this.path, JSON.stringify(products)).then(() => {
                return console.log("Product deleted");
            });
        } catch (error) {
            console.error(error);
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

export default ProductManager;