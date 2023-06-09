const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = products.length + 1;
        products.push(product);
        this.saveProducts(products);
    }

    getProducts() {
        try {
            const productsData = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(productsData);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        for (const product of products) {
            if (product.id === id) {
                return product;
            }
        }
        return null;
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products[i] = { ...products[i], ...updatedFields };
                this.saveProducts(products);
                return true;
            }
        }
        return false;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                this.saveProducts(products);
                return true;
            }
        }
        return false;
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

// Pruebas
const productManager = new ProductManager('productos.json');

const newProduct = {
    title: 'Producto de prueba',
    description: 'Descripción del producto de prueba',
    price: 9.99,
    thumbnail: 'ruta/de/imagen.png',
    code: 'ABC123',
    stock: 10
};
productManager.addProduct(newProduct);

const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

const productId = 1;
const productById = productManager.getProductById(productId);
console.log('Producto con id', productId + ':', productById);

const productIdToUpdate = 1;
const updatedFields = {
    price: 14.99,
    stock: 5
};
const isUpdated = productManager.updateProduct(productIdToUpdate, updatedFields);
console.log('¿Producto actualizado?', isUpdated);

const updatedProducts = productManager.getProducts();
console.log('Productos actualizados:', updatedProducts);

const productIdToDelete = 1;
const isDeleted = productManager.deleteProduct(productIdToDelete);
console.log('¿Producto eliminado?', isDeleted);

const remainingProducts = productManager.getProducts();
console.log('Productos restantes:', remainingProducts);

// Prueba del método saveProducts
const newProducts = [
    {
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 19.99,
        thumbnail: 'ruta/de/imagen1.png',
        code: 'DEF456',
        stock: 8
    },
    {
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 29.99,
        thumbnail: 'ruta/de/imagen2.png',
        code: 'GHI789',
        stock: 15
    }
];
productManager.saveProducts(newProducts);

const savedProducts = productManager.getProducts();
console.log('Productos guardados:', savedProducts);

