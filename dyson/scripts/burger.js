const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
  const isOpen = burger.classList.toggle("header__burger--open");
  menu.classList.toggle("open");
});
