const { v4: uuid } = require('uuid');
const formatPrice = require('../helpers/formatPrice');

class Product {
  constructor(input) {
    this.id = input.id || uuid();
    this.name = input.name || '';
    this.unit_price = Number(input.unit_price) || 0.0;
    this.final_price = Number(input.final_price) || 0.0;
    this.discount = Number(input.discount) || 0;
    this.stock = input.stock || 0;
    this.description = input.description || '';
    this.image = input.image || [];
    this.category = input.category || '';
  }

  get() {
    let finalPrice = this.calculateFinalPrice();
    return {
      id: this.id,
      name: this.name,
      unit_price: this.unit_price,
      stock: this.stock,
      description: this.description,
      image: this.image,
      final_price: finalPrice,
      final_price_formated: formatPrice(finalPrice),
      discount: this.discount,
      category: this.category,
    };
  }

  calculateFinalPrice() {    
    let finalPrice = this.unit_price;

    if(this.discount){
      finalPrice = finalPrice - this.unit_price * (this.discount / 100);
    }
    return finalPrice;
  }
}

module.exports = Product;
