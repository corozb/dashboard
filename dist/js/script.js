const $burger = document.querySelector('.burger_menu')
const $sidebar = document.querySelector('.sidebar')
const $close = document.querySelector('.close_button')

$burger.addEventListener('click', () => {
  $sidebar.classList.add('active')
})

$close.addEventListener('click', () => {
  $sidebar.classList.remove('active')
})