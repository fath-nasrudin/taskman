const { generateId } = require('../helper');

class Model {
  constructor() {
    this.items = {
      ids: [],
      data: {},
    };
  }

  read() {
    return this.items;
  }

  write(item) {
    this.items = item;
  }

  create(item) {
    const items = this.read();

    items.ids.push(item.id);
    items.data[item.id] = item;

    this.write(items);

    return items.data[item.id];
  }

  findById(itemId) {
    const items = this.read();
    const item = items.data[itemId];
    if (!item) return null;
    return item;
  }
  // the object filter use and logic for all properties.
  // looking an item that match all filter properties
  find(filter) {
    const items = this.read();
    if (!filter) {
      return items.ids.map((id) => items.data[id]);
    } else {
      const foundItems = [];
      items.ids.forEach((itemId) => {
        const item = items.data[itemId];
        const isMatch = this.checkIsMatch(item, filter);
        if (isMatch) foundItems.push(items.data[itemId]);
      });
      return foundItems;
    }
  }

  checkIsMatch(item, filter) {
    let isMatch = true;
    for (const key in filter) {
      // check if the filter property is object
      if (typeof filter[key] === 'object') {
        for (const subKey in filter[key]) {
          const itemSubKey = item[key]?.[subKey];
          const filterSubKey = filter[key]?.[subKey];
          if (itemSubKey !== filterSubKey) {
            isMatch = false;
            break;
          }
        }
      } else if (item[key] !== filter[key]) {
        isMatch = false;
        break;
      }
    }
    return isMatch;
  }

  update(itemId, itemData) {
    const items = this.read();
    const task = items.data[itemId];
    if (!task) return null;
    for (const key in itemData) {
      if (Object.hasOwnProperty.call(task, key)) {
        items.data[itemId][key] = itemData[key];
      }
    }
    items.data[itemId].updatedAt = new Date();
    this.write(items);
    return items.data[itemId];
  }

  // example {id: 'id', title: 'title'} default to && logic. so true if an object match all filter properties
  removeMany(filter) {
    const items = this.read();
    // remove the id, remove the objects
    const deletedItems = [];
    // looping ids
    items.ids.forEach((itemId) => {
      const item = items.data[itemId];
      let isMatch = this.checkIsMatch(item, filter);
      // the operation
      if (isMatch) {
        deletedItems.push(items.data[itemId]);
        delete items.data[itemId];
        items.ids = items.ids.filter((id) => id !== itemId);
      }
    });
    this.write(items);
    return deletedItems;
  }

  remove(id) {
    const deletedItems = this.removeMany({ id });
    if (!deletedItems.length) return null;

    return deletedItems[0];
  }
}

class Schema {
  constructor({ id, createdAt, updatedAt }) {
    this.id = id ? id : generateId();
    this.createdAt = createdAt ? createdAt : new Date();
    this.updatedAt = updatedAt ? updatedAt : new Date();
  }
}

module.exports = {
  Schema,
  Model,
};
