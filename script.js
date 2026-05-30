"use strict";

const header_block = document.querySelector(".header");

const burger_button = document.querySelector(".nav__burger");
const mobile_menu = document.querySelector(".nav__list");

const go_top_button = document.querySelector(".go-top");

const cookie_bar = document.querySelector(".cookie");
const cookie_button = document.querySelector(".cookie__button");

const modal_window = document.querySelector(".modal");
const modal_open_buttons = document.querySelectorAll(".modal-open");
const modal_close_button = document.querySelector(".modal__close");
const modal_overlay = document.querySelector(".modal__overlay");
const modal_form = document.querySelector(".modal__form");
const modal_email_input = document.querySelector("#modal-email");
const modal_error = document.querySelector(".modal__error");

const newsletter_form = document.querySelector(".newsletter__form");
const newsletter_email_input = document.querySelector("#newsletter-email");
const form_message = document.querySelector(".form-message");

const theme_button = document.querySelector(".theme-toggle");

theme_button.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("ipadzone_theme", "light");
  } else {
    localStorage.setItem("ipadzone_theme", "dark");
  }
});

if (localStorage.getItem("ipadzone_theme") === "light") {
  document.body.classList.add("light-theme");
}

function scroll_page() {
  const first_screen_height = window.innerHeight;

  if (window.scrollY > first_screen_height) {
    go_top_button.classList.add("go-top--visible");
  } else {
    go_top_button.classList.remove("go-top--visible");
  }
}

window.addEventListener("scroll", scroll_page);
window.addEventListener("resize", scroll_page);

scroll_page();

go_top_button.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

if (localStorage.getItem("ipadzone_cookie") === null) {
  cookie_bar.classList.add("cookie--visible");
}

cookie_button.addEventListener("click", () => {
  localStorage.setItem("ipadzone_cookie", "yes");
  cookie_bar.classList.remove("cookie--visible");
});