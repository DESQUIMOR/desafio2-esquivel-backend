
/*---------------------------------------------------------------------------------
*                              ProductManager Tests                               *
*_________________________________________________________________________________*/
const ProductManager = require("./productManager.js");
let productManager = new ProductManager();
console.log("--------------------------------------------------------------\n");
console.log("                     ProductManager Tests                     \n");
console.log("--------------------------------------------------------------\n");
let test = async () => {
/*---------------------------------------------------------------------------------
*                               Testing addProduct                                *
*_________________________________________________________________________________*/
    let ObjToAdd = {
        title: "Headphones2",
        description: "Wireless over-ear headphones with noise cancellation.",
        price: 149.99,
        thumbnail: "images/headphones.jpg",
        code: "HD002",
        stock: 20
    }
    console.log("\n----------------------Testing addProduct----------------------\n");
    await productManager.addProduct(ObjToAdd);
/*---------------------------------------------------------------------------------
*                               Testing getProduct                                *
*_________________________________________________________________________________*/
    let products = await productManager.getProducts();
    console.log("----------------------Testing getProduct----------------------\n");
    console.log("Product list:\n");
    console.log(products,"\n");
/*---------------------------------------------------------------------------------
*                             Testing getProductById                              *
*_________________________________________________________________________________*/
    const idTest = 0;
    console.log("--------------------Testing getProductById--------------------\n");
    console.log(`The product was searched with the id ${idTest}\n`);
    await productManager.getProductById(idTest);
/*---------------------------------------------------------------------------------
*                              Testing removeProduct                              *
*_________________________________________________________________________________*/
    const idToDelet = 1
    console.log("--------------------Testing removeProduct--------------------\n");
    await productManager.removeProduct(idToDelet)
/*---------------------------------------------------------------------------------
*                              Testing updateProduct                              *
*_________________________________________________________________________________*/
    console.log("--------------------Testing updateProduct---------------------\n");
    await productManager.updateProduct(0, {title:"Titulo modificado"})
};
test();
