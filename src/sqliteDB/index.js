var fs = require('fs')
var sqlite3 = require('sqlite3').verbose()

class SqliteDB {
  constructor(file) {
    DB.db = new sqlite3.Database(file)

    DB.exist = fs.existsSync(file)
    if (!DB.exist) {
      console.log('Creating db file!')
      fs.openSync(file, 'w')
    }
  }
}
