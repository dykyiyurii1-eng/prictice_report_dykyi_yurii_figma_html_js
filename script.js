"use strict";

const header_block = document.querySelector(".header");
const burger_button = document.querySelector(".nav__burger");
const mobile_menu = document.querySelector(".nav__list");
const menu_links = document.querySelectorAll(".nav__link");
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
const animated_sections = document.querySelectorAll(".section-animate");
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const sale_end = new Date();

sale_end.setDate(sale_end.getDate() + 7);
sale_end.setHours(23, 59, 59, 999);

function scroll_page() {
  header_block.classList.toggle("header--scrolled", window.scrollY > 20);
  go_top_button.classList.toggle("go-top--visible", window.scrollY > window.innerHeight);
}

function set_cookie(name, value, days) {
  const date = new Date(Date.now() + days * 86400000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function get_cookie(name) {
  return document.cookie.split("; ").some((item) => item.startsWith(`${name}=`));
}

function close_menu() {
  mobile_menu.classList.remove("is-open");
  burger_button.classList.remove("is-active");
  document.body.classList.remove("menu-open");
}

function open_modal() {
  modal_window.classList.add("modal--active");
  modal_window.ariaHidden = "false";
  document.body.classList.add("modal-opened");
  modal_email_input.focus();
}

function close_modal() {
  modal_window.classList.remove("modal--active");
  modal_window.ariaHidden = "true";
  document.body.classList.remove("modal-opened");
  modal_form.reset();
  modal_error.textContent = "";
  modal_error.classList.remove("form-message--error");
  modal_email_input.classList.remove("input-error");
}

function validate_email(input, message) {
  const is_valid = input.value.trim().match(email_regex);

  input.classList.toggle("input-error", !is_valid);
  message.textContent = is_valid ? "Email прийнято." : "Введіть коректний email.";
  message.classList.toggle("form-message--error", !is_valid);

  return is_valid;
}

if (localStorage.getItem("ipadzone_theme") === "light") {
  document.body.classList.add("light-theme");
}

theme_button.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("ipadzone_theme", document.body.classList.contains("light-theme") ? "light" : "dark");
});

window.addEventListener("scroll", scroll_page);
window.addEventListener("resize", scroll_page);
scroll_page();

go_top_button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

if (!get_cookie("ipadzone_cookie")) {
  cookie_bar.classList.add("cookie--visible");
}

cookie_button.addEventListener("click", () => {
  set_cookie("ipadzone_cookie", "yes", 30);
  cookie_bar.classList.remove("cookie--visible");
});

burger_button.addEventListener("click", () => {
  const is_open = mobile_menu.classList.toggle("is-open");

  burger_button.classList.toggle("is-active", is_open);
  document.body.classList.toggle("menu-open", is_open);
});

menu_links.forEach((link) => link.addEventListener("click", close_menu));

const splideElement = document.querySelector(".splide");

if (splideElement && window.Splide) {
  new Splide(splideElement, {
    type: "loop",
    perPage: 1,
    gap: "16px",
    loop: true,
    arrows: true,
    pagination: true,
    autoplay: true,
    interval: 1500,
    pauseOnHover: true,
    pauseOnFocus: true,
    breakpoints: {
      768: {
        arrows: false,
        perPage: 1,
        gap: "12px"
      }
    }
  }).mount();
}

modal_open_buttons.forEach((button) => button.addEventListener("click", open_modal));
modal_close_button.addEventListener("click", close_modal);
modal_overlay.addEventListener("click", close_modal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal_window.classList.contains("modal--active")) close_modal();
});

modal_form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validate_email(modal_email_input, modal_error)) modal_form.reset();
});

newsletter_form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validate_email(newsletter_email_input, form_message)) newsletter_form.reset();
});

if ("IntersectionObserver" in window) {
  document.body.classList.add("js-animate");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  animated_sections.forEach((section) => observer.observe(section));
}

function update_timer() {
  const time_left = sale_end - new Date();
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(time_left / day);
  const hours = Math.floor(time_left / hour) % 24;
  const minutes = Math.floor(time_left / minute) % 60;
  const seconds = Math.floor(time_left / second) % 60;

  document.querySelector("[data-days]").textContent = String(days).padStart(2, "0");
  document.querySelector("[data-hours]").textContent = String(hours).padStart(2, "0");
  document.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, "0");
  document.querySelector("[data-seconds]").textContent = String(seconds).padStart(2, "0");
}

update_timer();
setInterval(update_timer, 1000);
