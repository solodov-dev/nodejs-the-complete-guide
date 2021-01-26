const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, content) => {
      let cart = { products: [], total: 0 };
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
        cart.products = [...cart.products, updatedProduct];
      }
      cart.total += +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, content) => {
      if (err) return;
      const cart = JSON.parse(content);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) return;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - product.price * product.qty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => console.log(err));
    });
  }

  static getProducts(callback) {
    fs.readFile(p, (err, content) =>
      err ? callback(null) : callback(JSON.parse(content))
    );
  }
};
