document.addEventListener("click", (e) => {
  if (!select.contains(e.target)) toggle.checked = false;
});
const select = document.querySelector(".custom-select");
const title = select.querySelector(".custom-select__title");
const toggle = select.querySelector("#select-toggle");
const radios = select.querySelectorAll(".custom-select__radio");

radios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    // 1. Берем текст из соседнего label и ставим в заголовок
    title.textContent = e.target.nextElementSibling.textContent;
    // 2. Закрываем список (снимаем галочку с чекбокса)
    toggle.checked = false;
  });
});
