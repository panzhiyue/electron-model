const knex = require('knex')

// import * as a from 'better-sqlite3'
// console.log(a)
let file = 'I:\\MapTool\\public\\Map_Data.ti' //这里写的就是数据库文件的路径

export const run = () => {
  const db = knex({
    client: 'better-sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  })
  console.log(333)
  db.schema.createTable('persons').then(() => {
    console.log(222)
  })
}
