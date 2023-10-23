class ProductManager {
  constructor() {
      this.products = new Array();
  }

  getProducts = () => { return this.products }

  getProductsById = (id) => {
      const productFound = this.products.find(product => product.id === id);
      return productFound || console.error('Product not found')        
  }

  getId = () => {
      const count = this.products.length;
      return (count > 0) ? this.products[count-1].id + 1 : 1
  }
  
  // La función que permite agregar productos, con un ID generado automáticamente.
  addProduct = (title, description, price, thumbnail, code, stock) => {
      const product = {
          id: this.getId(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
      }
      this.#error(product).length == 0 ? this.products.push(product) : this.#error(product).forEach(error => console.log(error))
  }

  //Si alguno de los objetos cumple con las condiciones del if, es almacenado en el array de errores e imprime cual es el error.
  #error(product) {
      const errors = new Array();
      this.products.forEach(element => {if (element.code == product.code) errors.push(`El código ${product.code} ya existe.`)})
      if (Object.values(product).includes(undefined)) errors.push(`En el producto de ID: ${product.id} existen campos incompletos. Todos los campos son obligatorios`)
      return errors
  }

}


const productManager = new ProductManager()
productManager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imágen', 'abc1233', 25);
productManager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imágen', 'abc1233', 25);
console.log(productManager.getProducts());