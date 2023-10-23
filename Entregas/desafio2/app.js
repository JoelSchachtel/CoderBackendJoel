const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
        this.format = 'utf-8'
    }

     getId = async () => {
        const data = await this.getProduct()
        const count = data.length

        if (count == 0) return 1;

        const lastProduct = data[count - 1]
        const lastID = lastProduct.id
        const nextID = lastID + 1

        return nextID
    }


    addProduct = async (title, description, price, thumbnail, stock, code) => {
        const id = await this.getId()

        return this.getProduct()
            .then(products => {
                products.push({id, title, description, price, thumbnail, stock, code})
                return products
            })
            .then(productsNew => fs.promises.writeFile(this.path, JSON.stringify(productsNew)))
}

    getProductById = async (id) => {
        const data = await this.getProduct()
        const productFound = data.find(product => product.id === id)
        return productFound || console.log(`ERROR: EL PRODUCTO CON EL ID "${id}" NO EXISTE.`);
    }

    getProduct = async () => {
        const product = fs.promises.readFile(this.path, this.format)
        return product
            .then(content => JSON.parse(content))
            .catch(e => {if(e) return []})
    }

    deleteProduct = async (id) => {
        const data = await this.getProduct()
        const toBeDeleted = data.find(product => product.id === id)

        if(toBeDeleted){
            const index = data.indexOf(toBeDeleted)
            data.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(data))
            console.log(`\nPRODUCTO ELIMINADO: ID "${id}".`);
        } else {
            console.log(`\n\nERROR AL ELIMINAR PRODUCTO: EL PRODUCTO CON EL ID "${id}" NO SE ENCUENTRA EN LA LISTA.`);
        }
    }

    updateProduct = async (id, field, newValue) => {
        const data = await this.getProduct()
        const toBeUpdated = data.find(product => product.id === id)

        toBeUpdated[field] = newValue;
        
        await fs.promises.writeFile(this.path, JSON.stringify(data))
    }
}



async function run(){
    const manager = new ProductManager('./desafio2/fs/products.json')

    // Realizando el Testing

    //Se llama al método getProduct y se agrega el objeto conel ID generado aleatoriamente y no se repite
    await manager.addProduct('Producto prueba', 'Este es un producto de prueba', 200, 'Sin imágen', 25, 'abc123')
    console.log('El objeto fue agregado satisfactoriamente. Se ha generado el id aleatoriamente.')
    //Se llama al método getProducts
    console.log(await manager.getProduct());
    //Se llama al método getProductById
    console.log(await manager.getProductById(1))
    //Se llama al método updateProduct
    await manager.updateProduct(1, "title", "PRODUCTO ACTUALIZADO")
    await manager.updateProduct(1, "stock", 150)
    //Se llama al método deleteProduct
    await manager.deleteProduct(2)
}

run()