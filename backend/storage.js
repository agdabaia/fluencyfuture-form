const fs = require('fs');
const path = require('path');
const dbfile = path.resolve(__dirname, 'storage.json');

module.exports = {
  read() {
    try {
      const json = fs.readFileSync(dbfile, { encoding: 'utf-8' });
      return json;
    } catch(error) {
      console.error('Error while loading db.json', error);
      return [];
    }
  },

  save(data) {
    try {
      fs.writeFileSync(dbfile, data.toString(), { encoding: 'utf-8' });
      return true;
    } catch(error) {
      console.error('Error while saving db.json', error);
      return false;
    }
  }
}