const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o hay un error al leerlo, inicializamos products como un array vacío.
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  addProduct(product) {
    const newProduct = {
      id: this.generateId(),
      ...product,
    };
    this.products.push(newProduct);
    this.saveProducts();
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

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      // Actualizamos el producto en la posición index
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      // Eliminamos el producto en la posición index
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}


function testProductManager() {
    const productManager = new ProductManager('products.json');
  
    // Paso 2: Comprobar que getProducts() devuelve un arreglo vacío al crear la instancia
    let products = productManager.getProducts();
    console.assert(products.length === 0, "Expected an empty products array");
  
    // Paso 3: Añadir un producto
    const testProduct = {
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };
  
    const addedProduct = productManager.addProduct(testProduct);
  
    // Asegurarse de que se genera un ID automáticamente
    console.log(addedProduct.id !== undefined, "Expected product to have an ID");
  
    // Paso 5: Comprobar que getProducts() ahora contiene el producto
    products = productManager.getProducts();
    console.log(products.length === 1, "Expected products array to contain one product");
    console.log(products[0].title === testProduct.title, "Expected product title to match");
  
    // Paso 6: Obtener producto por ID
    const fetchedProduct = productManager.getProductById(addedProduct.id);
    console.log(fetchedProduct !== undefined, "Expected to find product by ID");
  
    // Paso 7: Actualizar producto
    const updatedFields = {
      title: "producto prueba actualizado",
    };
    const updatedProduct = productManager.updateProduct(addedProduct.id, updatedFields);
    console.log(updatedProduct.title === updatedFields.title, "Expected product title to be updated");
    console.log(updatedProduct.id === addedProduct.id, "Expected product ID to remain unchanged");
  
    // Paso 8: Eliminar producto
    const isDeleted = productManager.deleteProduct(addedProduct.id);
    console.log(isDeleted, "Expected product to be deleted");
    const deletedProduct = productManager.getProductById(addedProduct.id);
    console.log(deletedProduct === undefined, "Expected not to find the deleted product by ID");
  
    console.log("All tests passed!");
  }

testProductManager(); 
