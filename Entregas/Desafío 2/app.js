const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    await fs.writeFile(this.path, data);
  }

  async addProduct(producto) {
    const newProduct = {
      id: this.generateId(),
      ...producto,
    };
    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  generateId() {
    const maxId = this.products.reduce((max, product) => {
      return product.id > max ? product.id : max;
    }, 0);
    return maxId + 1;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  async updateProduct(id, productoActualizado) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...productoActualizado };
      await this.saveProducts();
      return this.products[index];
    }
    return null;
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      await this.saveProducts();
      return true;
    }
    return false;
  }
}

async function testProductManager() {
  const productManager = new ProductManager('productos.json');

  await productManager.loadProducts();
  let productos = productManager.getProducts();
  console.assert(productos.length === 0, "Se esperaba un arreglo de productos vacío");

  const productoPrueba = {
    title: "producto prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  };

  const productoAgregado = await productManager.addProduct(productoPrueba);

  console.assert(productoAgregado.id !== undefined, "Se esperaba que el producto tuviera un ID");

  productos = productManager.getProducts();
  console.assert(productos.length === 1, "Se esperaba que el arreglo de productos contenga un producto");
  console.assert(productos[0].title === productoPrueba.title, "Se esperaba que el título del producto coincidiera");

  const productoObtenido = productManager.getProductById(productoAgregado.id);
  console.assert(productoObtenido !== undefined, "Se esperaba encontrar un producto por ID");

  const camposActualizados = {
    title: "producto prueba actualizado",
  };
  const productoActualizado = await productManager.updateProduct(productoAgregado.id, camposActualizados);
  console.assert(productoActualizado.title === camposActualizados.title, "Se esperaba que el título del producto fuera actualizado");
  console.assert(productoActualizado.id === productoAgregado.id, "Se esperaba que el ID del producto permaneciera sin cambios");

  const eliminado = await productManager.deleteProduct(productoAgregado.id);
  console.assert(eliminado, "Se esperaba que el producto fuera eliminado");
  const productoEliminado = productManager.getProductById(productoAgregado.id);
  console.assert(productoEliminado === undefined, "No se esperaba encontrar el producto eliminado por ID");

  console.log("¡Todos los tests han pasado!");
}

testProductManager().catch(error => {
  console.error("Error durante los tests:", error);
});
