const generateId = () => {
  return Math.ceil(Math.random() * 10000000000).toString();
};

module.exports = {
  generateId,
};
