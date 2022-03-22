const fs = require('fs');
const path = require('path');
const fileName = 'users.json';
//Le pongo Items/Item para hacerlo generico y poder reutilizarlo mas facil para otros casos
const ItemsDB = require(`../db/${fileName}`);
const Item = require('../models/User');

/**
 * Saves an array of Items or it saves the actual state of the ItemsDB variable
 * @param  {} input File to be saved if its undefined, it will save the default state of Items.
 */
const saveFile = (input = undefined) => {
  if (!input) input = ItemsDB;
  try {
    fs.writeFileSync(
      path.resolve(__dirname, `../db/${fileName}`),
      JSON.stringify(input)
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
  return data ? JSON.parse(data) : ItemsDB;
};

const addItem = (input) => {
  
  let db = readFile();
  if (!input) {
    return {
      code: 'ERROR',
      message: '(item - addItem) INVALID INPUT',
    };
  }
  const newItem = new Item(input).get();
  if (newItem.parent) {
    addChildrenToParent(input.parent, newItem.id);
    db = readFile();
  }
  db[newItem.id] = newItem;
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


module.exports = {
  saveFile,
  readFile,
};
