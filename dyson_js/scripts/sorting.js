/*Управление фильтрацией товаров, переключением между страницами (пагинацией) и сохранением состояния сортировки через URL. У меня, как видно, две страницы для девяти карт товаров. Как обычно получаем элементы из DOM, чтобы манипулировать ими. Реализована двухуровневая система, чтобы фильтрация не «ломалась» при переходе между страницами (локальная сортировка - на месте, на определенной странице и глобальная - распространяется на весь ассортимент, на двух страницах).

Использован URLSearchParams, о котором пишут здесь: https://learn.javascript.ru/url;
Опциональная цепочка - отсюда https://learn.javascript.ru/optional-chaining;
window.location - см. BOM https://learn.javascript.ru/browser-environment;
Больше о событиях и генерация кастомных событий - https://learn.javascript.ru/dispatch-events;
*/

const allProductsData = [
  {id: "dyson-1", price: 59990, page: "index.html"},
  {id: "dyson-2", price: 47990, page: "index.html"},
  {id: "dyson-3", price: 46990, page: "index.html"},
  {id: "dyson-4", price: 59990, page: "index.html"},
  {id: "dyson-5", price: 47990, page: "index.html"},
  {id: "dyson-6", price: 46990, page: "index.html"},
  {id: "dyson-7", price: 47990, page: "page2.html"},
  {id: "dyson-8", price: 46990, page: "page2.html"},
  {id: "dyson-9", price: 59990, page: "page2.html"},
];

//Получение элементов
const cards = document.querySelectorAll(".offers__card");
const selectTitle = document.querySelector(".custom-select__title");
const selectToggle = document.getElementById("select-toggle");
const pages = ["index.html", "page2.html"];
const currentFile = window.location.pathname.split("/").pop() || pages[0];

// Утилита цены
const getPriceFromDOM = card => {
  const text = card.querySelector(".offers__current-price")?.textContent || "";
  return +text.split(" ").join("").split("₽").join("") || 0;
};

//Начало фильтрации(сортировки)
const filterCards = criteria => {
  let targetPage = currentFile;

  // а)Определение страницы через данные реестра
  if (criteria === "cheap" || criteria === "expensive") {
    const prices = allProductsData.map(p => p.price);
    const targetPrice =
      criteria === "cheap" ? Math.min(...prices) : Math.max(...prices);
    targetPage = allProductsData.find(p => p.price === targetPrice)?.page;
  } else if (["rating", "new", "popular"].includes(criteria)) {
    targetPage = "index.html";
  }

  if (targetPage && targetPage !== currentFile) {
    window.location.href = `${targetPage}?sort=${criteria}#offers-title`;
    return;
  }

  // b)Локальная работа (мы на определенной странице и там сортируем)
  const localPrices = [...cards].map(getPriceFromDOM);
  cards.forEach(card => {
    const price = getPriceFromDOM(card);
    const rules = {
      new: card.dataset.id !== "dyson-1",
      rating: card.dataset.id === "dyson-1",
      cheap: price === Math.min(...localPrices),
      expensive: price === Math.max(...localPrices),
      popular: true,
    };
    card.classList.toggle("offers__card--hidden", !(rules[criteria] ?? true));
  });
};

// Пагинация
const idx = pages.indexOf(currentFile);
const prevBtn = document.querySelector(".offers__paginator-btn--prev");
const nextBtn = document.querySelector(
  ".offers__paginator-btn:not(.offers__paginator-btn--prev)",
);

if (prevBtn) {
  idx > 0
    ? (prevBtn.href = pages[idx - 1] + "#offers-title")
    : prevBtn.classList.add("disabled");
}
if (nextBtn) {
  idx < pages.length - 1
    ? (nextBtn.href = pages[idx + 1] + "#offers-title")
    : nextBtn.classList.add("disabled");
}
const counter = document.querySelector(".offers__paginator-pages");
if (counter) counter.textContent = `${idx + 1} из ${pages.length}`;

// Загрузка
window.addEventListener("DOMContentLoaded", () => {
  const sortParam = new URLSearchParams(window.location.search).get("sort");
  if (sortParam) {
    const radio = document.querySelector(
      `input[name="offersSort"][value="${sortParam}"]`,
    );
    if (radio) {
      radio.checked = true;
      if (selectTitle)
        selectTitle.textContent = radio.nextElementSibling.textContent;
      filterCards(sortParam);
    }
  }
  if (window.location.hash === "#offers-title") {
    document
      .getElementById("offers-title")
      ?.scrollIntoView({behavior: "instant"});
  }
});

// События

// а)Селект
document.querySelectorAll('input[name="offersSort"]').forEach(radio => {
  radio.addEventListener("change", e => {
    if (selectTitle)
      selectTitle.textContent = e.target.nextElementSibling.textContent;
    if (selectToggle) selectToggle.checked = false;
    filterCards(e.target.value);
  });
});

// b)Ключевые слова-ссылки или теги (быстрые фильтры-сортировщики, помимо селекта)
document.querySelector(".offers__suggestions")?.addEventListener("click", e => {
  const tag = e.target.closest(".offers__suggestions-item");
  if (!tag) return;
  e.preventDefault();
  const radio = document.querySelector(
    `input[name="offersSort"][value="${tag.dataset.criteria}"]`,
  );
  radio
    ? ((radio.checked = true), radio.dispatchEvent(new Event("change")))
    : filterCards(tag.dataset.criteria);
});

// с)Кнопка "раскрыть"
document
  .querySelector(".offers__more")
  ?.addEventListener("click", function (e) {
    e.preventDefault();
    const list = document.querySelector(".offers__suggestions-list");
    [
      {text: "самый дорогой", criteria: "expensive"},
      {text: "все модели", criteria: "popular"},
    ].forEach(tag => {
      list.insertAdjacentHTML(
        "beforeend",
        `<a href="#" class="offers__suggestions-item" data-criteria="${tag.criteria}">${tag.text}</a>`,
      );
    });
    this.remove();
  });

// ________________________________________________________________________________
/* Инициализация данных и констант:
1)В массиве allProductsData хранится «реестр» всех товаров с их ценами и тем, на какой странице они находятся. Это нужно, чтобы скрипт знал, куда перенаправить пользователя (например, если самый дешевый товар лежит на второй странице).Определяется текущий файл (index.html или page2.html) для корректной работы ссылок.

2)Функция getPriceFromDOM - вспомогательная утилита. Она забирает текстовую цену из карточки (например, "59 990 ₽"), очищает её от пробелов и знака валюты, превращая в чистое число для сравнения.

3)Основная логика фильтрации (filterCards):
  a)Межстраничный переход: Если выбраны критерии "дешевый" или "дорогой", скрипт ищет в общем реестре, на какой странице находится товар с такой ценой. Если это не текущая страница, происходит редирект с параметром ?sort=....
  ***
  b)Локальная фильтрация: Если мы уже на нужной странице, скрипт сравнивает товары. Он перебирает карточки и добавляет класс --hidden тем, которые не подходят под условие (например, если ID не совпадает с нужным для фильтра "новинки").

4)Работа пагинации (переключатель страниц):скрипт автоматически находит кнопки "вперед" и "назад". На основе массива pages он прописывает правильные ссылки для перехода. Если страниц больше нет, кнопке добавляется класс disabled.

5)Обработка загрузки страницы (DOMContentLoaded):
Восстановление состояния: Скрипт проверяет URL. Если там есть ?sort=cheap (к примеру, по дешевизне), он автоматически "кликает" на нужный радиобаттон и запускает фильтрацию.
Скролл: Если в адресе есть хэш #offers-title, страница мгновенно прокручивается к заголовку товаров (чтобы пользователь не видел шапку сайта после перезагрузки - это одно из действий браузера по умолчанию, которое в данный момент нежелательно).

6)События и интерактив:
a)Радиокнопки: При смене сортировки обновляется текст в кастомном селекте и вызывается фильтрация.

b)Теги (Suggestions): Клик по быстрым кнопкам, т.е. ключевым словам (например, "самый дорогой") имитирует выбор в основном меню сортировки.dispatchEvent(new Event("change")) - Когда меняем значение radio.checked через JS, браузер не считает это изменением, которое сделал пользователь. Из-за этого стандартное событие change не срабатывает само по себе.Так как вся логика фильтрации и обновления заголовка селекта "висит" на обработчике change, нам нужно вручную имитировать этот клик.
dispatchEvent как бы «толкает» скрипт и сигнализирует об изменении радиокнопки и о том, что надо запустить сортировку.

c)Кнопка "Показать еще": При клике динамически добавляет новые теги в список и сама удаляется из DOM.
 */
