const CategoryServices = require('../services/categories.services');

/**
 * Esta lambda es solo para formatear el objeto que entra a la tabla
 * @param  {} input
 */
module.exports = (input) => {
  let response = input;
console.log("MARTIN_LOG=> formatObj", input);
  response = response.map((elem) => {
    const result = elem;
    if (result.children && result.children.length) {
      const childs = result.children.map((item) => {
        return item? item.name:"lala";
      });
      result.children = childs;
    }
    if (result.parent) {
      const parent = CategoryServices.getById(result.parent).payload;
      if (parent) {
        result.parent = parent.name;
      }
    }
    if(result.category){
      let categoryData = CategoryServices.getById(result.category);
      if(categoryData.payload){
        result.category = categoryData.payload.name;
      }
    }
    return result;
  });

  console.log('MARTIN_LOG=> formatobj', response);
  return response;
};
