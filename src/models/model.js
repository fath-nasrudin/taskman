const { generateId } = require('../helper');

class Model {
  constructor() {
    this.items = {
      ids: [],
      data: {},
    };
  }

  create(item) {
    this.items.ids.push(item.id);
    this.items.data[item.id] = item;
    return this.items.data[item.id];
  }

  findById(itemId) {
    const item = this.items.data[itemId];
    if (!item) return null;
    return item;
  }
  // the object filter use and logic for all properties.
  // looking an item that match all filter properties
  find(filter) {
    if (!filter) {
      return this.items.ids.map((id) => this.items.data[id]);
    } else {
      const foundItems = [];
      this.items.ids.forEach((itemId) => {
        const item = this.items.data[itemId];
        const isMatch = this.checkIsMatch(item, filter);
        if (isMatch) foundItems.push(this.items.data[itemId]);
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
    const task = this.items.data[itemId];
    if (!task) return null;
    for (const key in itemData) {
      if (Object.hasOwnProperty.call(task, key)) {
        this.items.data[itemId][key] = itemData[key];
      }
    }
    this.items.data[itemId].updatedAt = new Date();
    return this.items.data[itemId];
  }

  // example {id: 'id', title: 'title'} default to && logic. so true if an object match all filter properties
  removeMany(filter) {
    // remove the id, remove the objects
    const deletedItems = [];
    // looping ids
    this.items.ids.forEach((itemId) => {
      const item = this.items.data[itemId];
      let isMatch = this.checkIsMatch(item, filter);
      // the operation
      if (isMatch) {
        deletedItems.push(this.items.data[itemId]);
        delete this.items.data[itemId];
        this.items.ids = this.items.ids.filter((id) => id !== itemId);
      }
    });
    return deletedItems;
  }

  remove(id) {
    const deletedItems = this.removeMany({ id });
    if (!deletedItems.length) return null;
    return deletedItems[0];
  }
}

class Schema {
  constructor() {
    this.id = generateId();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = {
  Schema,
  Model,
};
