const { v4: uuid } = require('uuid');
const formatPrice = require('../helpers/formatPrice');

class Product {
  constructor(input) {
    this.id = input.data || uuid();
    this.name = input.name || '';
    this.unit_price = input.unit_price || 0.0;
    this.final_price = input.final_price || 0.0;
    this.discount = input.discount || 0;
    this.stock = input.stock || 0;
    this.description = input.description || '';
    this.imagen_url = input.imagen_url || '';
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
      imagen_url: this.imagen_url,
      final_price: finalPrice,
      final_price_formated: formatPrice(finalPrice),
      discount: this.discount,
      category: this.category,
    };
  }

  calculateFinalPrice() {    
    let finalPrice = this.unit_price;
    if(this.discount){
      finalPrice = this.final_price - this.unit_price * (this.discount / 100)
    }
    return finalPrice;
  }
}

module.exports = Product;
