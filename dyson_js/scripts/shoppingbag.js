/* Логика добавления товаров в корзину для списка карточек. Позволяет пользователю выбрать количество товара с помощью кнопок «плюс» и «минус», а затем отправить это количество в иконку корзины в шапке сайта.*/

const bag = document.querySelector(".header__bag");

// Восстановление данных из localStorage
const savedCount = localStorage.getItem("cartCount") || 0;
if (parseInt(savedCount) > 0) {
  bag.setAttribute("data-count", savedCount);
  bag.classList.add("header__bag--full");
}

document.querySelectorAll(".offers__card").forEach(card => {
  const group = card.querySelector(".offers__quantity-controls");
  const [minus, plus] = group.querySelectorAll(".offers__qty-btn"); //деструктуризация массива
  const val = group.querySelector(".offers__qty-value");
  const addBtn = card.querySelector(".offers__add-to-cart-btn");

  minus.disabled = parseInt(val.textContent) <= 0;

  // добавить или убавить товар
  group.addEventListener("click", e => {
    const btn = e.target.closest(".offers__qty-btn");
    if (!btn) return;

    let count = parseInt(val.textContent);
    btn === plus ? count++ : count > 0 && count--;

    val.textContent = count;
    minus.disabled = count <= 0;
  });

  // перенос в кошелек и очистка спана (см разметку)
  addBtn.addEventListener("click", () => {
    const count = parseInt(val.textContent);
    if (count <= 0) return; //ноль товаров в корзину не перенесется

    // перенос в шапку (любое набранное число); скрипт смотрит на иконку корзины (в шапке) и узнает, сколько товаров там уже лежит.
    const current = parseInt(bag.getAttribute("data-count") || 0);
    const newTotal = current + count;

    bag.setAttribute("data-count", current + count); //число в кружочке
    bag.classList.add("header__bag--full"); //сам кружочек

    // Сохранение в localStorage
    localStorage.setItem("cartCount", newTotal);

    // Сброс в 0 после добавления
    val.textContent = 0;
    minus.disabled = true;
  });
});

// по динамическому управлению атрибутами: https://learn.javascript.ru/dom-attributes-and-properties

// Добавлен функционал localStorage (ключ cartCount), чтобы не было сброса товаров из корзины при рефреше страницы - пока можно удалить сам ключ из devtools, если нужно очистить число набранных товаров. Функция очистки корзины пока не вводилась, т.к в макете не было самого интерфейса корзины. Метод parseInt используется для того, чтобы извлечь целое число из строки.

/*
1)Выбор элементов: Скрипт находит корзину в шапке (.header__bag) и перебирает все карточки товаров (.offers__card). Получаем из DOM все элементы управления кол-вом товара и добавления в корзину

2)Управление счетчиком (Плюс/Минус):
При клике на кнопки меняется число в текстовом поле (val.textContent). Минус не может работать если число товаров достигло нуля. Отрицательные значения товаров - такого не бывает.

3)Кнопка «минус» автоматически блокируется (disabled), если выбран ноль, чтобы нельзя было уйти в отрицательные значения.

4)Кнопка «Добавить» (addBtn):
Считывает число, которое пользователь накликал в карточке.
Прибавляет это число к текущему значению корзины в шапке (через атрибут data-count).
Добавляет корзине класс header__bag--full (обычно это нужно, чтобы подсветить иконку или показать кружок с цифрой).

5)Сброс: После нажатия на «В корзину» счетчик в самой карточке сбрасывается обратно в 0, а кнопка «минус» снова блокируется.
*/
