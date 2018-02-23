const router = require('express').Router()
const moment = require('moment')
const { getCityById } = require('../../model/db/cities')
const {
  getPostInfoById,
  getPostById,
  addPost,
  editPost,
  deletePost,
} = require('../../model/db/posts')

router.get('/posts/new', (req, res) => {
  const cityId = req.query.city_id
  getCityById(cityId).then((city) => {
    res.render('new_post', { cityId, city })
  })
})

router.get('/posts/:id', (req, res) => {
  const cityId = req.params.id
  const { city, profile } = (req.query)
  getPostInfoById(Number(cityId))
    .then((post) => {
      const ownPage = req.session.user.id === post.author_id
      const publishedDate = moment(post.date).format('dddd, MMMM Do YYYY')
      res.render('posts', {
        post,
        cityId,
        publishedDate,
        ownPage,
        city,
        profile,
      })
    })
    .catch(console.error)
})

router.post('/posts/new', (req, res) => {
  const { title, content, city_id } = req.body
  const { user } = req.session

  addPost(title, user.id, city_id, content)
    .then((newPost) => {
      if (newPost) {
        res.redirect(`/cities/${city_id}`)
      }
    })
    .catch(console.error)
})

router.get('/posts/edit/:id', (req, res) => {
  const id = Number(req.params.id)

  getPostById(id)
    .then((post) => {
      res.render('edit_post', { post })
    })
    .catch(console.error)
})

router.put('/posts/edit/:id', (req, res) => {
  const { postTitle, postContent } = req.body.data
  const postId = Number(req.body.data.postId)

  editPost(postId, postTitle, postContent)
    .then((response) => {
      res.json({ response })
    })
    .catch(console.error)
})

router.get('/posts/delete/:id', (req, res) => {
  const postId = req.params.id
  const { city, profile } = req.query
  deletePost(postId).then(() => {
    res.redirect(`/${city ? 'cities' : 'profile'}/${city || profile}`)
  })
})

module.exports = router
