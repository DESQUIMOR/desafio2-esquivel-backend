const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('productos.json');

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const products = productManager.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
});

app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
