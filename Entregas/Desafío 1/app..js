class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts = () => {
      return this.products;
    };
  
    getNextId = () => {
      const count = this.products.length;
      return count > 0 ? this.products[count - 1].id + 1 : 1;
    };
  
    existProduct = (code) => {
      return this.products.some((prod) => prod.code === code);
    };
  
    getProductById = (id) => {
      return (
        this.products.find((prod) => prod.id == id) ??
        "Código de producto inexistente."
      );
    };
  
    addProduct = (title, description, price, thumbnail, code, stock) => {
      if (!this.existProduct(code)) {
        const product = {
          id: this.getNextId(),
          code: code ?? 0,
          title: title ?? "",
          description: description ?? "",
          price: price ?? 0.0,
          thumbnail: thumbnail ?? "",
          stock: stock ?? 0,
        };
        this.products.push(product);
      } else {
        console.error(`Producto ${title} repetido. Codigo ${code} ya existente`);
      }
    };
  }
  
  const productsManager = new ProductManager();
  console.log(productsManager.getProducts());
  
  //Carga de un producto
  
  productsManager.addProduct("Computadora","Computadoras armadas por nosotros",1500,"Sin imágen disponible",'CAPN',10);
  
  console.log('\n Productos cargados:');
  console.log(productsManager.getProducts())
  
  productsManager.addProduct("Notebooks","Notebooks importadas",11500,"Sin imágen disponible",'NOTI',2);
  productsManager.addProduct("Notebooks","Notebooks nacionales",1150,"Sin imágen disponible",'NOTN',12);
  
  console.log('\n Productos cargados:'); //Actualización de productos cargados 
  console.log(productsManager.getProducts())
  
  console.log("\n-----------------------------------------------\n");
  console.log("traer elementos por id");
  console.log("\n-----------------------------------------------\n");
  
  console.log(productsManager.getProductById(1));
  console.log("\n-----------------------------------------------\n");
  
  console.log(productsManager.getProductById(2));
  console.log("\n-----------------------------------------------\n");
  
  console.log(productsManager.getProductById(5));
  
  console.log("\n-----------------------------------------------\n");