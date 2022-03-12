const fs = require('fs');
const path = require('path');
const fileName = 'categories.json';
//Le pongo Items/Item para hacerlo generico y poder reutilizarlo mas facil para otros casos
const ItemsDB = require(`../db/${fileName}`);
const Item = require('../models/Category');

const populateCategory = (item) => {
  if(item.children){
    item.children = item.children.map((child) => {
      const response = getById(child).payload;
  
      return response || child;
    });
  }

  if(item.parent){
    item.parent = getById(item.parent).payload;
  }

  return item;
};

/**
 * Saves an array of Items or it saves the actual state of the ItemsDB variable
 * @param  {} input File to be saved if its undefined, it will save the default state of Items.
 */
const saveFile = (input = undefined) => {
  console.log('SAVE FILE=> path', path.resolve(__dirname, `../db/${fileName}`));
  try {
    fs.writeFileSync(
      path.resolve(__dirname, `../db/${fileName}`),
      JSON.stringify(input || ItemsDB)
    );
    console.log('SE GUARDO');
  } catch (error) {
    return {
      code: 'ERROR',
      message: error.message,
    };
  }
  console.log('HOLA');
  return {
    code: 'OK',
    message: 'File Saved Successfully',
  };
};

const addItem = (input) => {
  if (!input) {
    return {
      code: 'ERROR',
      message: '(item - addItem) INVALID INPUT',
    };
  }
  const newItem = new Item(input).get();
  ItemsDB.push(newItem);
  const response = saveFile();
  if (response.code === 'ERROR') {
    return response;
  }

  return {
    code: 'OK',
    message: 'Item Saved Successfully',
    payload: newItem,
  };
};

/**
 * @param  {} input?={populate: boolean}
 */
const getAll = (input) => {
  if (!input || !input.populate) {
    return ItemsDB || [];
  }
  
  const items = [];
  Object.keys(ItemsDB).forEach((key) => {
    items.push(populateCategory(ItemsDB[key]));
  });


  console.log(items);
  return items;
};

/**
 * Gets an Item based on its ID
 * @param  {} id item identifier REQUIRED
 */
const getById = (id, options = undefined) => {
  if (!id) {
    return {
      code: 'ERROR',
      message: '(item - getById) INVALID INPUT',
    };
  }

  const item = ItemsDB[id];
  if (!item) {
    return {
      code: 'ERROR',
      message: '(item - getById) Item not found',
    };
  }

  if (options && options.populate) {
    item = populateCategory(item);
  }

  return {
    code: 'OK',
    payload: item,
  };
};

/**
 * @param  {} input item to be updated {id: required, ...everythingElse}
 */
const updateItem = (input) => {
  if (!input || !input.id) {
    return {
      code: 'ERROR',
      message: '(item - updateItem) INVALID INPUT',
    };
  }

  const prodId = input.id;
  const response = getById(prodId);

  if (response.code === 'ERROR') {
    return {
      code: 'ERROR',
      message: '(item - updateItem) Item not found',
    };
  }

  const updatedBody = new Item({ ...response.payload, ...input }).get();
  ItemsDB[prodId] = updatedBody;
  saveFile();

  return {
    code: 'OK',
    message: 'Item Updated Successfully',
    payload: ItemsDB[prodId],
  };
};

/**
 * Removes an Item based on its ID
 * @param  {} id item identifier REQUIRED
 */
const removeItem = (id) => {
  if (!id) {
    return {
      code: 'ERROR',
      message: '(item - getById) INVALID INPUT',
    };
  }

  const response = getById(id);

  if (response.code === 'ERROR') {
    return {
      code: 'ERROR',
      message: '(item - removeItem) Item not found',
    };
  }

  delete ItemsDB[id];

  return {
    code: 'OK',
    message: 'Item Deleted Successfully',
  };
};

module.exports = {
  save: saveFile,
  add: addItem,
  getAll,
  getById,
  update: updateItem,
  remove: removeItem,
};
