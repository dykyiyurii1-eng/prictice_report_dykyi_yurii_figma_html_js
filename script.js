'use strict'
const theme_button = document.querySelector('.theme-toggle');

theme_button?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  if (document.body.classList.contains('light-theme')) {
    localStorage.setItem('ipadzone_theme', 'light');
  } else {
    localStorage.setItem('ipadzone_theme', 'dark');
  }
});

if (localStorage.getItem('ipadzone_theme') === 'light') {
  document.body.classList.add('light-theme');
}
