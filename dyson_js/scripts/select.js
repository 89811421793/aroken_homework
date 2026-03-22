/* Основная логика: закрытие при клике вне элемента и обновление текста при выборе опции. Управляет поведением кастомного выпадающего списка. Такой селект выполнен через тег form, т.е это завуалированная форма. Под капотом переключатели (радио-кнопки).*/

document.addEventListener("click", e => {
  if (!select.contains(e.target)) toggle.checked = false;
});

// основные элементы селекта в DOM, их получение
const select = document.querySelector(".custom-select");
const title = select.querySelector(".custom-select__title");
const toggle = select.querySelector("#select-toggle");
const radios = select.querySelectorAll(".custom-select__radio");

radios.forEach(radio => {
  radio.addEventListener("change", e => {
    // 1. Берем текст из соседнего label и ставим в заголовок
    title.textContent = e.target.nextElementSibling.textContent;
    // 2. Закрываем список (снимаем галочку с чекбокса)
    toggle.checked = false;
  });
});

/*
1) Слушаем клик по всему документу, чтобы закрыть список, если нажали мимо. target - это целевой и интересующий нас объект, с которым идет взаимодействие

2) Проверка: если место клика (e.target) НЕ находится внутри нашего блока .custom-select, то снимаем галочку с чекбокса, тем самым скрывая выпадающее меню

3) Идет перебор каждой радиокнопки, и для каждой радиокнопки внутри селекта вешается слушатель. Когда пользователь выбирает вариант, код берет текст из элемента, который идет сразу после радиокнопки (обычно это <label>) и записываем этот текст в основной заголовок селекта. После выбора варианта список, снимая галочку с чекбокса, должен закрыться автоматически.
nextElementSibling - см. https://learn.javascript.ru/dom-navigation
*/
