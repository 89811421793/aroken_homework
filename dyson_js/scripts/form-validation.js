/*Валидация полей форм и появление специальных поп-апов после ввода корректных данных. Регулярные выражения не использовались.*/

const body = document.body;

// 1)УПРАВЛЕНИЕ МОДАЛКАМИ
const openModal = modalId => {
  const modal = document.querySelector(modalId);
  if (modal) {
    modal.classList.add("modal--active");
    body.style.overflow = "hidden";
  }
};

const closeModal = () => {
  const activeModal = document.querySelector(".modal--active");
  if (activeModal) {
    activeModal.classList.remove("modal--active");
    body.style.overflow = "";
  }
};

// Закрытие по клику на элементы с data-close (крестики)
document.addEventListener("click", e => {
  if (e.target.closest("[data-close]")) {
    closeModal();
  }
});

// Закрытие при клике на серый фон (оверлей)
document.addEventListener("click", e => {
  if (e.target.classList.contains("modal--active")) {
    closeModal();
  }
});

// Закрытие по Escape
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// ____________________________________________________________________________________________
// 2)ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (ВАЛИДАЦИЯ И ХРАНИЛИЩЕ)

// Сохранение данных в браузер (localStorage)
const saveToStorage = (key, data) => {
  // Получаем старые данные или создаем пустой массив, если их нет
  const existingData = JSON.parse(localStorage.getItem(key)) || [];
  // Добавляем новую запись с меткой времени
  existingData.push({...data, date: new Date().toLocaleString()});
  // Сохраняем обновленный массив обратно в формате строки
  localStorage.setItem(key, JSON.stringify(existingData));
};

const setError = (input, message) => {
  input.classList.add("input-error");
  const errorText = input.nextElementSibling;
  if (errorText && errorText.classList.contains("form__error-message")) {
    errorText.textContent = message;
    errorText.classList.add("error--active");
  }
};

const clearError = input => {
  input.classList.remove("input-error");
  const errorText = input.nextElementSibling;
  if (errorText && errorText.classList.contains("form__error-message")) {
    errorText.textContent = "";
    errorText.classList.remove("error--active");
  }
};
// __________________________________________________________________________________________________
// 3)ПЕРВАЯ ФОРМА (ОБРАТНАЯ СВЯЗЬ)
const contactForm = document.querySelector(".contacts__form");

if (contactForm) {
  const nameInput = contactForm.querySelector('input[name="full-name"]');
  const phoneInput = contactForm.querySelector('input[name="phone-number"]');

  // Обработка имени (Только буквы)
  nameInput.addEventListener("input", () => {
    clearError(nameInput);
    const val = nameInput.value;

    // Фильтруем: оставляем только те символы, у которых есть регистр (буквы) или пробел
    const filteredVal = val
      .split("")
      .filter(char => {
        const isLetter =
          char.toLowerCase() !== char.toUpperCase() || char === " ";
        if (!isLetter) {
          setError(nameInput, "Допустимы только буквы"); // Мгновенная подсветка
        }
        return isLetter;
      })
      .join("");

    if (val !== filteredVal) {
      nameInput.value = filteredVal;
    }
  });

  // Обработка телефона (Только цифры)
  phoneInput.addEventListener("input", () => {
    clearError(phoneInput);
    const val = phoneInput.value;

    // Фильтруем: оставляем только цифры
    const filteredVal = val
      .split("")
      .filter(char => {
        const isDigit = char >= "0" && char <= "9";
        if (!isDigit && char !== "+") {
          // Разрешаем плюс в начале, если нужно
          setError(phoneInput, "Допустимы только цифры"); // Мгновенная подсветка
        }
        return isDigit;
      })
      .join("");

    if (val !== filteredVal) {
      phoneInput.value = filteredVal;
    }
  });

  // Финальная проверка введенных данных (длина имени и тел номера)
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    let isValid = true;

    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();

    if (nameValue.length < 2) {
      setError(nameInput, "Минимум 2 символа");
      isValid = false;
    }

    if (phoneValue.length < 10) {
      setError(phoneInput, "Минимум 10 цифр");
      isValid = false;
    }

    if (isValid) {
      saveToStorage("contact_requests", {
        name: nameValue,
        phone: phoneValue,
      });

      openModal("#modal-success");
      contactForm.reset();
    }
  });
}
// ______________________________________________________________________________________

//  4)ВТОРАЯ ФОРМА (ПОДПИСКА)
const subscribeForm = document.querySelector(
  'form[aria-label="Форма подписки на новости"]',
);

// Функция проверки на кириллицу через коды символов
const isCyrillicChar = char => {
  const code = char.charCodeAt(0);
  // Диапазоны Unicode для русских букв: А-Я (1040-1071), а-я (1072-1103), Ё (1025), ё (1105)
  return (code >= 1040 && code <= 1103) || code === 1025 || code === 1105;
};

if (subscribeForm) {
  const emailInput = subscribeForm.querySelector('input[name="email"]');

  // Блокировка ввода кириллицы
  emailInput.addEventListener("beforeinput", e => {
    if (e.data) {
      // Проверяем каждый вводимый символ
      for (let char of e.data) {
        if (isCyrillicChar(char)) {
          e.preventDefault(); // Символ не напечатается
          setError(emailInput, "Используйте латинские буквы");
          return;
        }
      }
    }
  });

  // Очистка ошибки при вводе
  emailInput.addEventListener("input", () => {
    clearError(emailInput);
  });

  // Обработки отправки (submit)
  subscribeForm.addEventListener("submit", e => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();

    // Валидация перед отправкой
    if (emailValue.length > 5 && emailValue.includes("@")) {
      // Сохранение
      saveToStorage("subscriptions", {
        email: emailValue,
      });

      openModal("#modal-success2");
      subscribeForm.reset();
      clearError(emailInput);
    } else {
      setError(emailInput, "Введите корректный email");
    }
  });
}

/*1) Управление модальными окнами
Открытие и закрытие: Созданы функции, которые добавляют или удаляют CSS-класс modal--active. При открытии блокируется прокрутка страницы (overflow: hidden), при закрытии — возвращается обратно.
Слушатели событий: Скрипт ищет клики по кнопкам с атрибутом data-close (обычно это "крестики"). Реализовано закрытие при клике на «оверлей» (пустое пространство вокруг окна). Добавлена возможность закрыть модалку нажатием клавиши Escape.

2) Вспомогательные инструменты
Хранилище (localStorage): Функция saveToStorage берет существующий массив данных из памяти браузера, добавляет в него новый объект с информацией из формы и текущей датой, а затем сохраняет обновленный список обратно. Отображение ошибок: Функции setError и clearError управляют визуальной частью валидации: добавляют/удаляют синюю нижнюю границу инпутам и выводят текст ошибки в соседний элемент (тоже синеватым).

3) Работа с формой обратной связи (Имя и Телефон)
Фильтрация "на лету":В поле имени при вводе сразу удаляются любые символы, кроме букв и пробелов.В поле телефона блокируется всё, кроме цифр.
Валидация при отправке: Когда пользователь нажимает "Отправить", скрипт проверяет длину данных (минимум 2 символа для имени и 10 для телефона).
Финал: Если всё верно, данные добавятся в localStorage, форма очистится, и показывается модальное окно об успехе (#modal-success).

4) Работа с формой подписки (Email)
Запрет кириллицы: Используется событие beforeinput, которое проверяет код каждого символа. Если пользователь пытается ввести русскую букву, ввод блокируется до того, как символ появится в поле. Проверка Email: При отправке проверяется наличие символа @ и общая длина строки.
Финал: Данные сохраняются в отдельный ключ subscriptions, и открывается второе модальное окно успеха (#modal-success2).
*/
