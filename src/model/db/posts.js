const db = require('./db')

const addPost = (title, author_id, city_id, content) => {
  const sql = `
  INSERT INTO posts (title, author_id, city_id, content)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `
  return db.one(sql, [title, author_id, city_id, content])
}
const getPostById = (id) => {
  const sql = 'SELECT * FROM posts WHERE id = $1'
  return db.one(sql, id)
}

const getPostsByUserId = (id) => {
  const sql = 'SELECT * FROM posts WHERE author_id= $1'
  return db.any(sql, id)
}


const getPostInfoById = (id) => {
  const sql = `
    SELECT posts.id, posts.title, posts.city_id, posts.content, posts.author_id,
    users.full_name
    FROM posts
    JOIN users
    ON author_id = users.id
    WHERE posts.id = $1
    `
  return db.one(sql, id)
}

const getPostsByCityId = (cityId) => {
  const sql = `
  SELECT posts.id, posts.title, posts.content, posts.date,
  users.full_name,
  cities.name, cities.img_url, cities.id AS city_id
  FROM posts
  JOIN cities
  ON posts.city_id = cities.id
  JOIN users
  ON posts.author_id = users.id
  WHERE posts.city_id = $1
  ORDER BY date
  DESC
  `
  return db.many(sql, cityId)
}

const editPost = (id, newTitle, newContent) => {
  const sql = `
  UPDATE posts SET title = $2, content = $3
  WHERE id = $1
  RETURNING *
  `
  return db.one(sql, [id, newTitle, newContent])
}

const deletePost = (id) => {
  const sql = `
  DELETE FROM posts
  WHERE id = $1
  `
  return db.none(sql, id)
}


module.exports = {
  addPost, getPostById, getPostsByUserId, getPostInfoById, getPostsByCityId, editPost, deletePost,
}
