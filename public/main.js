const editProfileBtn = document.getElementById('edit-save')
const editPostBtn = document.getElementById('edit-post-save')

const updateProfileFetch = (pathUrl, data) => {
  fetch(pathUrl, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ data }),
  })
}

const updatePostFetch = (pathUrl, data) => {
  fetch(pathUrl, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ data }),
  })
    .then(response => response.json())
    .then((response) => {
      const { id } = response.response
      window.location.pathname = (`/posts/${id}`)
    })
}


const getProfileElements = () => {
  const name = document.getElementById('full-name')
  const city = document.getElementById('city')
  return { name, city }
}
const editClick = function () {
  editProfileBtn.innerHTML = 'Save Profile'
  const { name, city } = getProfileElements()
  const currName = name.innerHTML
  const currCity = city.innerHTML
  name.outerHTML = `<input id="full-name" value="${currName}"></input>`
  city.outerHTML = `<input id="city" value="${currCity}"></input>`
}

const saveClick = (event) => {
  const pathUrl = ('/profile-update')
  const { name, city } = getProfileElements()
  editProfileBtn.innerHTML = 'Edit Profile'
  const newName = name.value
  const newCity = city.value
  name.outerHTML = `<span id="full-name">${newName}</span>`
  city.outerHTML = `<span id="city">${newCity}</span>`
  event.preventDefault()
  const data = { newName, newCity }
  updateProfileFetch(pathUrl, data)
}

if (editProfileBtn) {
  editProfileBtn.addEventListener('click', function (event) {
    if (this.innerHTML.startsWith('E')) {
      editClick(event)
    } else {
      saveClick(event)
    }
  })
}

if (editPostBtn) {
  editPostBtn.addEventListener('click', (event) => {
    const postTitle = document.querySelectorAll('.edit-title')[0].value
    const postContent = document.querySelectorAll('.edit-content')[0].value
    const postId = document.querySelectorAll('.post-id')[0].innerHTML
    const pathUrl = (`/posts/edit/${postId}`)

    event.preventDefault()
    const data = { postId, postTitle, postContent }
    updatePostFetch(pathUrl, data)
  })
}
