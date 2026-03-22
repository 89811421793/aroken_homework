/* Реализация системы управления отзывами: открытие модального окна, сохранение данных в память браузера (localStorage) и логика динамической подгрузки контента.
 */

// Элементы управления модалкой
const btnAdd = document.querySelector(".reviews__btn-add");
const modal = document.getElementById("reviewModal");
const closeBtn = document.querySelector(".modal__close-btn");
const reviewForm = document.getElementById("reviewForm");

// Элементы списка отзывов
const btnMore = document.querySelector(".reviews__btn-more");
const reviewsContainer = document.querySelector(".reviews .container");
let userReviewsQueue = []; // Очередь для скрытых отзывов (динамически будут добавляться)

// ЛОГИКА LOCALSTORAGE (Загрузка)

const initStorage = () => {
  const savedReviews = JSON.parse(localStorage.getItem("userReviews") || "[]");

  savedReviews.forEach(html => {
    // Если кнопка "Показать еще" есть в DOM, кладем старые отзывы в очередь
    if (document.body.contains(btnMore)) {
      userReviewsQueue.push(html);
    } else {
      // Если кнопки нет (или она была удалена ранее), выводим сразу
      reviewsContainer.insertAdjacentHTML("beforeend", html);
    }
  });
};

// Запускаем проверку хранилища при старте
initStorage();

// ЛОГИКА МОДАЛКИ

// Открыть
btnAdd.addEventListener("click", () => {
  modal.style.display = "block";
});

// Закрыть (крестик)
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Закрыть (Esc)
document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.style.display = "none";
});

// Закрыть (клик мимо окна)
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

//  ЛОГИКА ФОРМЫ(которая в самом поп-апе, которую пользователь заполняет для отзыва)

reviewForm.addEventListener("submit", e => {
  e.preventDefault();

  // Собираем данные из полей
  const name = reviewForm.querySelector('input[type="text"]').value;
  const title = document.getElementById("reviewTitle").value;
  const rating = Number(reviewForm.querySelector("select").value);
  const comment = reviewForm.querySelector("textarea").value;

  // Форматирование даты
  const now = new Date();
  const rawDate = now.toLocaleDateString("ru-RU");
  const date = rawDate.split(".").join("/");

  // Шаблон ответа
  const newReviewHTML = `
    <div class="reviews__row" role="article">
      <div class="reviews__rating-summary">
        <span class="reviews__user">${name}</span>
        <div class="reviews__stars">
          ${'<svg aria-hidden="true"><use href="./images/icons/sprite.svg#ratestar"></use></svg>'.repeat(rating)}
        </div>
      </div>
      <div class="reviews__content">
        <h3 class="reviews__content-title">${title}</h3>
        <p class="reviews__content-text">${comment}</p>
      </div>
      <time class="reviews__card-date">${date}</time>
    </div>
  `;

  // СОХРАНЕНИЕ В LOCALSTORAGE
  const savedReviews = JSON.parse(localStorage.getItem("userReviews") || "[]");
  savedReviews.push(newReviewHTML);
  localStorage.setItem("userReviews", JSON.stringify(savedReviews));

  // ПРОВЕРКА: куда выводить (в очередь или сразу в DOM)
  if (document.body.contains(btnMore)) {
    userReviewsQueue.push(newReviewHTML);
  } else {
    reviewsContainer.insertAdjacentHTML("beforeend", newReviewHTML);
  }

  reviewForm.reset();
  modal.style.display = "none";
});

//  ЛОГИКА КНОПКИ "ПОКАЗАТЬ ЕЩЕ"

const guestReviewTemplate = `
  <div class="reviews__row" role="article" aria-label="Отзыв от Guest">
    <div class="reviews__rating-summary">
      <span class="reviews__user">Guest</span>
      <div class="reviews__stars">
        ${'<svg aria-hidden="true"><use href="./images/icons/sprite.svg#ratestar"></use></svg>'.repeat(5)}
      </div>
    </div>
    <div class="reviews__content">
      <h3 class="reviews__content-title">Хороший фен</h3>
      <p class="reviews__content-text">Пользуюсь неделю, пока всё устраивает. Работает тихо.</p>
    </div>
    <time class="reviews__card-date" datetime="2023-11-10">10/11/2023</time>
  </div>
`;

// Проверка на существование кнопки перед навешиванием события
if (btnMore) {
  btnMore.addEventListener("click", () => {
    // Добавляем Guest
    btnMore.insertAdjacentHTML("beforebegin", guestReviewTemplate);

    // Добавляем из очереди (включая те, что загрузились из localStorage)
    userReviewsQueue.forEach(html => {
      btnMore.insertAdjacentHTML("beforebegin", html);
    });

    // Чистим и удаляем кнопку
    userReviewsQueue = [];
    btnMore.remove();
  });
}

/*
1. Поиск элементов и подготовка
Скрипт находит в HTML кнопки добавления и закрытия, само модальное окно, форму и контейнер, куда будут добавляться отзывы. Также создается пустой массив userReviewsQueue — это "очередь" для хранения отзывов, которые пользователь уже написал, но которые еще не отображены на странице.

2. Загрузка сохраненных данных (initStorage).При обновлении страницы скрипт обращается к localStorage. Если там есть старые отзывы, он их достает.
Если на странице присутствует кнопка "показать еще", отзывы отправляются в «очередь» (они появятся только после клика по кнопке). Если кнопки нет, отзывы сразу отрисовываются в контейнере.

3. Управление модальным окном. Реализованы три стандартных сценария закрытия формы .Клик по кнопке-крестику,нажатие клавиши Esc,клик в любое место экрана за пределами самого окна.

4. Обработка отправки формы (форма-это внутренняя часть модалки здесь).Когда пользователь нажимает "отправить". Сбор данных: скрипт забирает текст из полей (имя, заголовок, рейтинг, текст).
Форматирование: текущая дата превращается в формат ДД/ММ/ГГГГ, а число рейтинга преобразуется в нужное количество SVG-иконок звезд. Генерация HTML: создается блок с версткой нового отзыва. Сохранение: новый отзыв добавляется в массив в localStorage (чтобы он не исчез после перезагрузки).
Отрисовка или очередь: если кнопка "показать еще" жива, отзыв уходит в очередь. Если нет — сразу прилипает в конец списка.

5. Логика кнопки "показать еще". Если пользователь нажимает на эту кнопку.В список вставляется заранее заготовленный "фейковый" отзыв от Guest.
Следом за ним выгружаются все отзывы из очереди (те, что были в localStorage и те, что пользователь написал в текущей сессии).Очередь очищается, а сама кнопка удаляется из DOM, так как показывать больше нечего.
*/

/*отзыв от Guest не связан с localStorage здесь. Это как статический элемент, просто изначально он скрыт*/
