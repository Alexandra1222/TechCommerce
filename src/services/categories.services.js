const fs = require('fs');
const path = require('path');
const fileName = 'categories.json';
//Le pongo Items/Item para hacerlo generico y poder reutilizarlo mas facil para otros casos
const ItemsDB = require(`../db/${fileName}`);
const Item = require('../models/Category');

const populateCategory = (input) => {
  const result = input;
  let children = result.children;
  if (children && children.length) {
    result.children = children.map((child) => {
      const response = getById(child).payload;
      return response;
    });
  }

  return result;
};

const addChildrenToParent = (parentId, child) => {
  const response = getById(parentId);
  if (response) {
    const parent = response.payload;
    if (parent) {
      if (!parent.children) parent.children = [];

      if (!parent.children.find((a) => a === child)) {
        parent.children.push(child);
      }
      updateItem(parent);
    }
  }
};

const removeChildrenToParent = (parentId, children) => {
  const response = getById(parentId);
  if (response) {
    const parent = response.payload;
    const childIndex = parent.children.findIndex((a) => a === children);
    parent.children.splice(childIndex, 1);
    updateItem(parent);
  }
};

const removeParentFromChildren = (childrens) => {
  childrens.forEach((child) => {
    const childPayload = getById(child).payload;
    if (childPayload) {
      childPayload.parent = null;
      updateItem(childPayload);
    }
  });
};

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

/**
 * @param  {} input?={populate: boolean}
 */
const getAll = ({input,filter}) => {
  if (!input || !input.populate) {
    return ItemsDB || [];
  }
  const db = readFile();
  let items = [];
  Object.keys(db).forEach((key) => {
    items.push(populateCategory(db[key]));
  });
  if(filter==="isMain"){
    items = items.filter(a=>a.isMain);
  }
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

  let item = readFile()[id];

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
  let db = readFile();
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
  const inDb = response.payload;

  //Ingresamos un nuevo parent y es distinto al que esta en la DB (no tiene sentido actualizarlo si no)
  if (input.parent && input.parent !== inDb.parent) {
    //validamos que haya algo en la DB y si lo que entra es vacio, null etc, significa que queremos borrar esa dependencia
    if (inDb.parent != null) {
      removeChildrenToParent(inDb.parent, inDb.id);
    }
    if (input.parent !== 'null') addChildrenToParent(input.parent, inDb.id);
    else {
      input.parent = null;
    }
    db = readFile();
  }

  const updatedBody = new Item({ ...inDb, ...input }).get();

  db[prodId] = updatedBody;
  saveFile(db);

  return {
    code: 'OK',
    message: 'Item Updated Successfully',
    payload: db[prodId],
  };
};

/**
 * Removes an Item based on its ID
 * @param  {} id item identifier REQUIRED
 */
const removeItem = (id) => {
  let db = readFile();

  if (!id) {
    return {
      code: 'ERROR',
      message: 'Entrada Invalida',
    };
  }

  const response = getById(id);

  if (response.code === 'ERROR') {
    return {
      code: 'ERROR',
      message: 'No se encontro la categoria',
    };
  }

  const inDb = response.payload;
  if(inDb.isMain){
    return {
      code: 'ERROR',
      message: 'No puedes eliminar una categoria principal',
    };
  }
  if (inDb.parent != null) {
    removeChildrenToParent(inDb.parent, inDb.id);
    db = readFile();
  }
  if (inDb.children && inDb.children.length) {
    removeParentFromChildren(inDb.children);
    db = readFile();
  }
  delete db[id];

  saveFile(db);
  return {
    code: 'OK',
    message: '??Eliminacion exitosa!',
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
