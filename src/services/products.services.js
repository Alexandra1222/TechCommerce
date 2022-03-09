const fs = require('fs');
const path = require('path');
const fileName = 'products.json';
//Le pongo Items/Item para hacerlo generico y poder reutilizarlo mas facil para otros casos
const ItemsDB = require(`../db/${fileName}`);
const Item = require('../models/Product');
/**
 * Saves an array of Items or it saves the actual state of the ItemsDB variable
 * @param  {} input File to be saved if its undefined, it will save the default state of Items.
 */
const saveFile = (input = undefined) => {
  console.log("SAVE FILE=> path", path.resolve(__dirname, `../db/${fileName}`));
  try {
    fs.writeFileSync(
      path.resolve(__dirname, `../db/${fileName}`),
      JSON.stringify(input || ItemsDB)
    );
    console.log("SE GUARDO");
  } catch (error) {
    return {
      code: 'ERROR',
      message: error.message,
    };
  }
  console.log("HOLA");
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

const getAll = () => {
  return ItemsDB || [];
};
/**
 * Gets an Item based on its ID
 * @param  {} id item identifier REQUIRED
 */
const getById = (id) => {
  if (!id) {
    return {
      code: 'ERROR',
      message: '(item - getById) INVALID INPUT',
    };
  }

  const index = ItemsDB.findIndex((item) => item.id === id);
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
      item: ItemsDB[index],
    },
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

  const { code, payload } = getById(input.id);

  if (code === 'ERROR') {
    return {
      code: 'ERROR',
      message: '(item - updateItem) Item not found',
    };
  }
  ItemsDB[payload.index] = { ...payload.item, ...input };
  saveFile();

  return {
    code: 'OK',
    message: 'Item Updated Successfully',
    payload: ItemsDB[payload.index],
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

  const { code, payload } = getById(id);

  if (code === 'ERROR') {
    return {
      code: 'ERROR',
      message: '(item - removeItem) Item not found',
    };
  }

  ItemsDB.splice(payload.index, 1);

  return {
    code: 'OK',
    message: 'Item Updated Successfully',
    payload: ItemsDB[payload.index],
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
