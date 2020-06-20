const hamburger = document.querySelector('.hamburger')
const navLinks = document.querySelector('.nav-links')
const links = document.querySelectorAll('.nav-links li')
const btnToggle = document.querySelector('#modeToggle i')

window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme')
  if (theme === 'light') {
    btnToggle.classList.add('fa-sun-o')
    btnToggle.style.padding = '4px 3.8px'
    btnToggle.classList.remove('fa-moon-o')
    document.querySelector('body').classList.add(theme)
  }
})

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open')
  links.forEach(link => {
    link.classList.toggle('fade')
  })
  hamburger.classList.toggle('toggle')
})

btnToggle.addEventListener('click', () => {
  if (btnToggle.classList.contains('fa-moon-o')) {
    btnToggle.classList.add('fa-sun-o')
    btnToggle.style.padding = '4px 3.8px'
    btnToggle.classList.remove('fa-moon-o')
    localStorage.setItem('theme', 'light')
  } else {
    btnToggle.classList.add('fa-moon-o')
    btnToggle.classList.remove('fa-sun-o')
    btnToggle.style.padding = '4px 5px'
    localStorage.clear()
  }
  document.querySelector('body').classList.toggle('light')
})

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const regex = /\/#[\w+]+/
    const title = link.href.match(regex)[0].slice(2)
    document.title = `${title[0].toUpperCase() + title.slice(1)} | Mokshit Jain`
  })
})
