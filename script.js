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
const slider_slides = document.querySelectorAll(".slider__slide");
const slider_prev = document.querySelector(".slider__button--prev");
const slider_next = document.querySelector(".slider__button--next");
const slider_dots = document.querySelector(".slider__dots");

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

burger_button.addEventListener("click", () => {
  const is_open = mobile_menu.classList.toggle("is-open");

  burger_button.classList.toggle("is-active", is_open);
  document.body.classList.toggle("menu-open", is_open);
});

menu_links.forEach((link) => {
  link.addEventListener("click", () => {
    mobile_menu.classList.remove("is-open");
    burger_button.classList.remove("is-active");
    document.body.classList.remove("menu-open");
  });
});

let active_slide = 0;

function show_slide(index) {
  slider_slides.forEach((slide, slide_index) => {
    slide.classList.toggle("slider__slide--active", slide_index === index);
  });

  document.querySelectorAll(".slider__dot").forEach((dot, dot_index) => {
    dot.classList.toggle("slider__dot--active", dot_index === index);
  });
}

slider_slides.forEach((slide, index) => {
  const dot = document.createElement("button");

  dot.className = "slider__dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Показати слайд ${index + 1}`);
  dot.addEventListener("click", () => {
    active_slide = index;
    show_slide(active_slide);
  });

  slider_dots.append(dot);
});

slider_prev.addEventListener("click", () => {
  active_slide = (active_slide - 1 + slider_slides.length) % slider_slides.length;
  show_slide(active_slide);
});

slider_next.addEventListener("click", () => {
  active_slide = (active_slide + 1) % slider_slides.length;
  show_slide(active_slide);
});

show_slide(active_slide);
