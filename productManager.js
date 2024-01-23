class ProductManager {
    // Id global
    static id = 0;
    constructor() {
        // Inicializando la clase
        this.products = [];
        this.fs = require("fs");
        this.ProdDirPath = "./files";
        this.ProdFilePath = this.ProdDirPath + "/Products.json";
    }
    updateFile = async () => {
        /// Crear el directorio
        await this.fs.promises.mkdir(this.ProdDirPath, { recursive: true });
        // Se valida la existencia del archivo o se crea
        if (!this.fs.existsSync(this.ProdFilePath)) {
            // Crea el archivo vacío
            await this.fs.promises.writeFile(this.ProdFilePath, "[]");
        };
        // Leemos el archivo
        let productsFile = await this.fs.promises.readFile(this.ProdFilePath, "utf-8");
        // Se parsea el .json
        this.products = JSON.parse(productsFile);
    }
    // Actualizará el id global al más alto
    idPersistence = async (products) => {
        const higherId = products.reduce((maxId, obj) => {
            return obj.id > maxId ? obj.id : maxId;
        }, -1);
        ProductManager.id = higherId + 1
    }
    // Agregará un producto al arreglo de productos inicial.
    addProduct = async (product) => {
        // Llamará aidPersistence para actualizar el id global
        await this.idPersistence(await this.getProducts())
        // Validación de campos obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("\nAll fields are required.\n");
            return;
        }
        try {
            await this.updateFile()
            //Validación de código único
            if (this.products.some(p => p.code === product.code)) {
                console.log("\nA product with the same code already exists\n");
            } else {
                // Asignación de id autoincrementable
                const newProduct = {
                    id: ProductManager.id,
                    ...product
                };
                // Agregar el nuevo producto al arreglo
                this.products.push(newProduct);
                console.log(newProduct);
                // Actualizamos el archivo de productos
                await this.fs.promises.writeFile(this.ProdFilePath, JSON.stringify(this.products, null, 2, "\t"));
                console.log(`\nthe product was created successfully\n`);
                console.log("The product was created with the id:", ProductManager.id);
            }
        } catch (error) {
            console.error(`Error adding new product ${JSON.stringify(newProduct)}, error detail: ${error}`);
            throw Error(`Error adding new product: ${JSON.stringify(newProduct)}, error detail: ${error}`);
        }
    }
    // Devolver el arreglo con todos los productos creados hasta el momento
    getProducts = async () => {
        try {
            
            await this.updateFile()
            return this.products
        } catch (error) {
            console.error(`Error consulting products: ${this.ProdDirPath}, error detail: ${error}`);
            throw Error(`Error consulting products: ${this.ProdDirPath}, error detail: ${error}`);
        }
    }
    // Buscará un producto recibiendo el id
    getProductById = async (id) => {
        try {
            await this.updateFile()
            // Busca en el arreglo el producto que coincida por su id
            const product = this.products.find(p => p.id === id);
            if (product) {
                console.log(product);
                return product;
            } else {
                console.log("\nProduct not found\n");
            }
        } catch (error) {
            console.error(`Error consulting products by id: ${this.ProdDirPath}, error detail: ${error}`);
            throw Error(`Error consulting products by id: ${this.ProdDirPath}, error detail: ${error}`);
        }
    }
    removeProduct = async (id) => {
        try {
            // Obtener la lista de productos actualizada actualizada
            let updatedList = await this.getProducts()
            // Remover el producto con el id especificado
            updatedList = updatedList.filter(obj => obj.id !== id);
            this.products = updatedList
            console.log(this.products);
            // Actualizamos el archivo de productos
            await this.fs.promises.writeFile(this.ProdFilePath, JSON.stringify(this.products, null, 2, "\t"));
            console.log(`\nThe product was deleted successfully\n`);
            console.log(`\nthe new list of products:\n\n`);
            console.log(this.products);
        } catch (error) {
            console.error(`Error deleting product, error detail: ${error}`);
            throw Error(`Error deleting product, error detail: ${error}`);
        }
    }
}

// --------------------------Exportar clase -------------------------------

module.exports = ProductManager;