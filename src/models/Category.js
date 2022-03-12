const { v4: uuid } = require('uuid');

class Category {
  constructor(input) {
    this.id = input.id || uuid();
    this.name = input.name || '';
    this.children = input.children || [];
    this.parent = input.parent || null;
  }

  get() {
    return {
      name: this.name,
      children: this.children,
      parent: this.parent,
    };
  }
}

module.exports= Category;