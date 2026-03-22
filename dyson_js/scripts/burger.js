/*Drag-and-Drop (или "свайп-интерфейс") для упрятывания бургер-меню сенсорно, запрет прокрутки страницы при включенном состоянии*/

// Находим в документе кнопку-бургер и само меню
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");

// Создаем массив для одновременного управления обоими элементами
const ui = [menu, burger];

// Функция, которая "переключает" состояние: : открывает или закрывает
const toggleMenu = () => {
  burger.classList.toggle("header__burger--open");
  menu.classList.toggle("open");
  document.body.classList.toggle("noscroll"); // Блокируем прокрутку body при открытом бургере(класс noscroll - в global.css)
};

// Используем addEventListener вместо onclick для надежности
burger.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  toggleMenu();
});

document.addEventListener("click", e => {
  const target = e.target;
  // Проверяем, что меню открыто и клик был вне меню и не по бургеру
  // Используем closest, чтобы точно поймать клик даже по мелким деталям внутри бургера
  if (
    menu.classList.contains("open") &&
    !menu.contains(target) &&
    !target.closest(".header__burger")
  ) {
    toggleMenu();
  }
});

//_________________________________________________________________________________
/*Drag-and-Drop (или "свайп-интерфейс") + события touchstart,touchmove,touchend*/

let touchStartX = 0;
let isMoving = false;

// Слушаем старт на самом меню
menu.addEventListener(
  "touchstart",
  e => {
    if (!menu.classList.contains("open")) return;

    touchStartX = e.changedTouches[0].clientX;
    isMoving = false;
    // Убираем анимацию у обоих элементов, чтобы они не "отлипали" друг от друга
    ui.forEach(el => (el.style.transition = "none"));
  },
  {passive: true},
);

// Слушаем движение на всем документе
document.addEventListener(
  "touchmove",
  e => {
    if (!menu.classList.contains("open")) return;

    const currentX = e.changedTouches[0].clientX;
    let diff = currentX - touchStartX;

    // Не даем тянуть вправо (больше 0)
    if (diff <= 0) {
      isMoving = true;
      // Меню двигаем через left (как в CSS)
      menu.style.left = `${diff}px`;
      // Бургер двигаем через transform, чтобы он синхронно уезжал влево
      burger.style.transform = `translateX(${diff}px)`;
    }
  },
  {passive: true},
);

document.addEventListener("touchend", e => {
  if (!menu.classList.contains("open")) return;

  const touchEndX = e.changedTouches[0].clientX;
  const swipeDistance = touchStartX - touchEndX;

  // Возвращаем анимацию ПЕРЕД сбросом координат
  ui.forEach(el => {
    el.style.transition = "";
  });

  // Сбрасываем стили
  menu.style.left = "";
  burger.style.transform = "";

  // Если реально смахнули — закрываем
  if (isMoving && swipeDistance > 70) {
    toggleMenu();
  }

  isMoving = false;
});

// _________________________________________________________________________________

// по событиям тач и указателя - learn.javascript.ru/pointer-events
// по drag'n'drop - https://learn.javascript.ru/mouse-drag-and-drop
// по координатам: learn.javascript.ru/coordinates
// learn.javascript.ru/mouse-events-basics#koordinaty-clientx-y-pagex-y

/*1)Инициализация. Скрипт находит в DOM кнопку-бургер и само меню. Создается вспомогательный массив ui, чтобы в дальнейшем можно было быстро применить стили (например, отключение анимации) к обоим элементам сразу.

2)Переключение состояния (Toggle). Функция toggleMenu отвечает за открытие и закрытие. Она поочередно добавляет или удаляет CSS-классы у бургера и меню, а также вешает на body класс noscroll, чтобы страница не прокручивалась под открытым меню.

3)Обработка кликов. При клике на бургер предотвращается стандартное поведение ссылки и срабатывает открытие/закрытие.
Реализовано закрытие при клике вне области: если пользователь нажал на любую часть документа, пока меню открыто, скрипт проверяет, не был ли это клик по самому меню или бургеру. Если клик "внешний", меню закрывается.
*/

/*Свайп-интерфейс (Touch события):
1)Начало касания (touchstart): Запоминается координата пальца по оси X и временно отключаются CSS-переходы (transition), чтобы элементы мгновенно следовали за пальцем без задержек.

2)Движение (touchmove): Вычисляется разница между начальной точкой и текущим положением пальца. Если пользователь тянет влево, меню и кнопка-бургер синхронно смещаются вслед за пальцем. Движение вправо блокируется.

3)Завершение касания (touchend): Скрипт проверяет, на какое расстояние пользователь успел 'смахнуть' меню.
Если дистанция свайпа превысила 70 пикселей, вызывается toggleMenu для полного закрытия.
В любом случае плавные анимации (transition) возвращаются на место, а временные сдвиги координат сбрасываются.
*/

/*stopPropagation и предотвращение 'всплытия'. Конфликт обработчиков: У меня в коде два обработчика клика. Один висит на кнопке-бургере (открывает/закрывает меню). Второй висит на всем документе document (закрывает меню, если клик был вне него).Когда я нажимаю на бургер, срабатывает первый обработчик. Если не вызвать stopPropagation(), событие пойдет выше к document. Там сработает второй обработчик, который увидит, что меню открыто, и тут же его закроет.Без этой строки меню могло бы закрываться мгновенно после открытия (или вообще не открываться визуально), так как два обработчика сработали бы друг за другом.*/
