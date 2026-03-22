/*Расширение кнопки для новостей. При нажатии раскрывает три дополнительных карточки. Ничего особенного.*/

document
  .getElementsByClassName("news__btn-more")[0]
  .addEventListener("click", function () {
    const newsList = document.getElementsByClassName("news__list")[0];

    // Массив карточек новостей состоит из трех элементов, у каждого уникальный id, ну и остальные свойства, присущие обычно новостям - заголовки, описания, даты..
    const newArticlesData = [
      {
        id: 4,
        title: "Как выбрать идеальный фен",
        description:
          "Рассказываем, на что обратить внимание при покупке: от мощности до насадок.",
        date: "20 января 2023",
        datetime: "2023-01-20",
      },
      {
        id: 5,
        title: "Тренды причесок 2024",
        description:
          "Разбираем главные хиты сезона: каре, многослойность и аксессуары.",
        date: "5 февраля 2024",
        datetime: "2024-02-05",
      },
      {
        id: 6,
        title: "Уход за волосами зимой",
        description:
          "Как спасти локоны от перепадов температур и сухого воздуха в помещениях.",
        date: "12 февраля 2025",
        datetime: "2025-02-12",
      },
    ];

    newArticlesData.forEach(data => {
      // Шаблон разметки для каждой карточки, который и будет динамически вставляться
      const newArticle = `
      <article class="news__card" role="listitem" aria-labelledby="news-title-${data.id}">
        <header class="news__card-header">
          <picture>
            <source srcset="./images/2x/news_pic@2x.webp 2x" type="image/webp" media="(min-resolution: 2dppx)" />
            <img class="news__card-img" src="./images/news_pic.jpg" width="440" height="294" loading="lazy" alt="Описание фото" aria-describedby="news-desc-${data.id}" />
          </picture>
          <div class="news__card-info">
            <time class="news__card-date" datetime="${data.datetime}" aria-label="Дата публикации: ${data.date}">${data.date}</time>
            <h3 class="news__card-title" id="news-title-${data.id}">${data.title}</h3>
            <p class="news__description" id="news-desc-${data.id}">
              ${data.description}
            </p>
          </div>
        </header>
        <footer class="news__card-footer">
          <a class="news__card-link" href="#" aria-label="Читать далее статью: ${data.title}">Читать далее</a>
        </footer>
      </article>
    `;

      newsList.insertAdjacentHTML("beforeend", newArticle);
    });

    this.remove();
  });

/*1)Кнопку "показать еще" получаем из DOM по имени класса, она обрабатывает событие клика на нее. При клике на нее должно произойти следующее:
  
2) Cкрипт находит элемент с классом news__list (тоже через индекс [0]). Это список, куда будут добавляться новые карточки новостей.

3) Для каждого объекта создается строка newArticle с HTML-кодом. Данные из объекта (например, ${data.title}) подставляются в нужные места шаблона, через шаблонные строки. Шаблон, кстати, по желанию, можно и не вносить в отдельную переменную. Сами объекты каждой новости хранятся в общем массиве (newArticlesData).

4) Метод insertAdjacentHTML с параметром "beforeend" вставляет готовую строку с карточкой в самый конец контейнера newsList (заранее определенный блок, куда все статьи будут подсоединяться).

5) Кнопка "Добавить еще" выполнила раскрытие элементов. Ее нужно скрыть.  В конце срабатывает this.remove(). Поскольку this внутри обычной функции ссылается на саму кнопку, по которой кликнули, она удаляется со страницы после выполнения своей задачи.
*/
