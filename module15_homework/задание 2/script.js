const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
  let width = window.innerWidth
  let height = window.innerHeight

  alert(`Screen width: ${width}, screen height: ${height}`)
})