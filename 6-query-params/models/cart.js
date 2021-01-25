const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, content) => {
      const cart = { products: [], total: 0 };
      if (!err) {
        cart = JSON.parse(content);
      }
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
      }
      cart.total += price;
      cart.products = [...cart.products, updatedProduct];
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }
};
