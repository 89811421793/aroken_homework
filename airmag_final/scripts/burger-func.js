const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".menu");
burger.addEventListener("click", () => {
  burger.classList.toggle("header__burger--open");
  menu.classList.toggle("open");
});

const header = document.querySelector(".header");
let isScrolling;
window.addEventListener("scroll", () => {
  header.classList.add("header--fixed");
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    header.classList.remove("header--fixed");
  }, 150);
});
