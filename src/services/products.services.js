const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const fileName = 'products.json';
//Le pongo Items/Item para hacerlo generico y poder reutilizarlo mas facil para otros casos
const ItemsDB = require(`../db/${fileName}`);
const Item = require('../models/Product');
/**
 * Saves an array of Items or it saves the actual state of the ItemsDB variable
 * @param  {} input File to be saved if its undefined, it will save the default state of Items.
 */
const saveFile = (input = undefined) => {
  
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

const readFile = () => {
  const data = fs.readFileSync(path.resolve(__dirname, `../db/${fileName}`), {
    encoding: 'utf8',
    flag: 'r',
  });
  return data ? JSON.parse(data): ItemsDB;
};

const addItem = (input) => {
  const db= readFile();
  if (!input) {
    return {
      code: 'ERROR',
      message: '(item - addItem) INVALID INPUT',
    };
  }
  const newItem = new Item(input).get();
  db.push(newItem);
  const response = saveFile(db);
  if (response.code === 'ERROR') {
    return response;
  }

  return {
    code: 'OK',
    message: 'Item Saved Successfully',
    payload: newItem,
  };
};

const getAll = (filter = undefined) => {
  const db= readFile();
  if (!db.length) {
    return [];
  }

  if (!filter) {
    return db;
  }

  let filteredItems;
  if (filter.category) {
    filteredItems = db.filter((item) => item.category === filter.category);
  }

  return filteredItems.length ? filteredItems : db;
};
/**
 * Gets an Item based on its ID
 * @param  {} id item identifier REQUIRED
 */
const getById = (id) => {
  const db= readFile();
  if (!id) {
    return {
      code: 'ERROR',
      message: '(item - getById) INVALID INPUT',
    };
  }

  const index = db.findIndex((item) => item.id === id);
  if (index < 0) {
    return {
      code: 'ERROR',
      message: '(item - getById) Item not found',
    };
  }

  return {
    code: 'OK',
    payload: {
      index,
      item: db[index],
    },
  };
};

/**
 * @param  {} input item to be updated {id: required, ...everythingElse}
 */
const updateItem = (input) => {
  const db= readFile();
  if (!input || !input.id) {
    return {
      code: 'ERROR',
      message: '(item - updateItem) INVALID INPUT',
    };
  }

  const { code, payload } = getById(input.id);

  if (code === 'ERROR') {
    return {
      code: 'ERROR',
      message: '(item - updateItem) Item not found',
    };
  }
  const updatedBody = new Product({ ...payload.item, ...input }).get();
  db[payload.index] = updatedBody;
  saveFile(db);

  return {
    code: 'OK',
    message: 'Item Updated Successfully',
    payload: db[payload.index],
  };
};

/**
 * Removes an Item based on its ID
 * @param  {} id item identifier REQUIRED
 */
const removeItem = (id) => {
  const db= readFile();
  if (!id) {
    return {
      code: 'ERROR',
      message: '(item - getById) INVALID INPUT',
    };
  }

  const { code, payload } = getById(id);

  if (code === 'ERROR') {
    return {
      code: 'ERROR',
      message: '(item - removeItem) Item not found',
    };
  }

  db.splice(payload.index, 1);
  saveFile(db);
  return {
    code: 'OK',
    message: 'Item Updated Successfully',
    payload: db[payload.index],
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
