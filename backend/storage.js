const fs = require('fs');
const path = require('path');
const dbfile = path.resolve(__dirname, 'storage.json');

module.exports = {
  read() {
    try {
      const json = fs.readFileSync(dbfile, { encoding: 'utf-8' });
      return JSON.parse(json);
    } catch(error) {
      console.error('Error while loading db.json', error);
      return [];
    }
  },

  save(data) {
    try {
      const json = fs.writeFileSync(dbfile, JSON.stringify(data), { encoding: 'utf-8' });
      return true;
    } catch(error) {
      console.error('Error while saving db.json', error);
      return false;
    }
  }
}