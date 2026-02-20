const modal = document.querySelector(".modal");
const modalWindow = document.querySelector(".modal-buy");
const openBtn = document.querySelector('[data-modal-button="buy"]');
const closeBtn = document.querySelector("[data-modal-close]");

const toggleModal = (isOpen) => {
  modal.classList.toggle("modal--open", isOpen);
  modalWindow.classList.toggle("modal__window--open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
};

openBtn.addEventListener("click", () => toggleModal(true));
closeBtn.addEventListener("click", () => toggleModal(false));

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("modal--open")) {
    toggleModal(false);
  }
});

/* 1)Выбираем определенные элементы через селеторы классов и по селекторам атрибутов. Заносим их в фиксированные переменные
(константы); можно использовать и обычные динамически типизированные переменные через let

2)Стрелочная функция управления модалкой. При состоянии открытия динамически подгружаем бэмовские модификаторы и запрещаем прокрутку(для всего body включается свойство overflow:hidden). То есть добавляем одновременно и оверлей (modal) и сам попап(modal__window)

3)Метод или функция слушателя событий добавляется к соответст элементам (как раз туда куда поставили атрибуты:  data-modal-button="buy" для кнопки в один клик и data-modal-close для закрытия окна). Обрабатывается события клика ЛКМ в обоих случаях. Стрелочные анонимные функции - это обработчики события клика при булевых значениях. Логическое true-при клике окно откроется, при false-закроется

4) keydown - событие отжатой клавиши на клаве. "event" и "e" - это одно и то же(объект создается браузером и туда заносится инфа о событии). Если мы отжали Esc и (НЕ ИЛИ) в коллекции активных классов найден бэмский модификатор открытого состояния 'modal--open', то закрыть модалку. "&&" - логический оператор соединения "И". не перепутать с логическим оператором "ИЛИ" ||.
*/
