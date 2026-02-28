const pages = ["index.html", "page2.html", "page3.html"];
const current = window.location.pathname.split("/").pop() || pages[0];
const idx = pages.indexOf(current);

const prevBtn = document.querySelector(".offers__paginator-btn--prev");
const nextBtn = document.querySelector(
  ".offers__paginator-btn:not(.offers__paginator-btn--prev)",
);
const counter = document.querySelector(".offers__paginator-pages");

if (idx !== -1) {
  // Устанавливаем ссылки или отключаем кнопки
  idx > 0 ? (prevBtn.href = pages[idx - 1]) : prevBtn.classList.add("disabled");
  idx < pages.length - 1
    ? (nextBtn.href = pages[idx + 1])
    : nextBtn.classList.add("disabled");

  // Обновляем текст
  counter.textContent = `${idx + 1} из ${pages.length}`;
}
