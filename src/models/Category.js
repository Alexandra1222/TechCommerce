const { v4: uuid } = require('uuid');

class Category {
  constructor(input) {
    this.id = input && input.id? input.id : uuid();
    this.name = input && input.name? input.name : '';
    this.children = input && input.children? input.children : [];
    this.parent = input && input.parent !== "null"? input.parent : undefined;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      children: this.children,
      parent: this.parent,
    };
  }
}

module.exports= Category;