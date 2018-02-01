const db = require('./db')

const getAllCities = () => {
  const sql = 'SELECT * FROM cities'
  return db.many(sql)
}

const getCityById = (id) => {
  const sql = 'SELECT * FROM cities WHERE id = $1'
  return db.one(sql, id)
}

module.exports = { getAllCities, getCityById }
