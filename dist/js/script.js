// ---- BURGER MENU----------
// Set constants and grab needed elements
const $burger = document.querySelector('.burger_menu')
const $sidebar = document.querySelector('.sidebar')
const $close = document.querySelector('.close_button')

// Menu open sidenav icon, shown only on mobile
$burger.addEventListener('click', () => {
  $sidebar.classList.add('active')
})

$close.addEventListener('click', () => {
  $sidebar.classList.remove('active')
})

// // ---- PROFILE MENU --------
// // User avatar dropdown functionality
const $user = document.querySelector('.persona')

$user.addEventListener('click', () => {
  const $settings = document.querySelector('.settings')
  $settings.classList.toggle('settings_active')
})

// SIDENAV
// sidenav list hidden
const $topic = document.querySelectorAll('.topic')

$topic.forEach(listItem => {
  listItem.addEventListener('click', ()=> {
  const subList = listItem.nextElementSibling
  // subList.classList.toggle('list_hidden')
  
  // Reveal/hide the sublist
  if (subList) {
    subList.classList.toggle('list_hidden')
  }
  
  // Add/remove selected styles to list category heading
  if (listItem) {
    listItem.classList.toggle('topic--open')
  }

  })
})
