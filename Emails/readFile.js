module.exports = function getData(file,type) {
    const fs = require('fs');
    return fs.promises.readFile(file,type);;
  }
