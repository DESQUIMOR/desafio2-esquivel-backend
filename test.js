const ProductManager = require("./productManager.js");
let productManager = new ProductManager();
// console.log(productManager);

let test = async () => {
    // Agregar un producto
    await productManager.addProduct({
        title: "Headphones",
        description: "Wireless over-ear headphones with noise cancellation.",
        price: 149.99,
        thumbnail: "images/headphones.jpg",
        code: "HD471",
        stock: 15
    });
    // Traer la lista de productos
    let products = await productManager.getProducts();
    console.log("\nProduct list:\n\n");
    console.log(products);
    // Buscar un producto por su id
    const idTest = 4;
    console.log(`\nThe id that was searched was: ${idTest}\n`);
    await productManager.getProductById(idTest);
    const idToDelet = 9
    await productManager.removeProduct(idToDelet)
};
test();
