// Задача 1.
// Напишите функцию calculateFinalPrice, которая принимает базовую цену товара, процент скидки и налоговую ставку. Функция должна вычислять скидку, затем прибавлять налог и возвращать итоговую цену.

// Пример работы:
// console.log(calculateFinalPrice(100, 10, 0.2)); // 108
// console.log(calculateFinalPrice(100, 10, 0)); // 90

// Задача 2.
// Напишите функцию checkAccess, которая принимает имя пользователя и пароль. Если имя пользователя равно "admin" и пароль равен "123456", функция должна возвращать строку "Доступ разрешен", иначе — "Доступ запрещен".

// Задача 3.
// Напишите функцию getTimeOfDay, которая принимает текущее время (число от 0 до 23) и возвращает строку:
// "Ночь" (с 0 до 5 часов),
// "Утро" (с 6 до 11 часов),
// "День" (с 12 до 17 часов),
// "Вечер" (с 18 до 23 часов).
// Если введённое значение не попадает в этот диапазон, возвращайте `"Некорректное время"`.

// Задача 4.
// Напишите функцию findFirstEven, которая принимает два числа start и end и находит первое чётное число в указанном диапазоне.
// Если чётного числа в этом диапазоне нет, функция должна вернуть "Чётных чисел нет".

// Пример работы:
// console.log(findFirstEven(1, 10)); // 2
// console.log(findFirstEven(9, 9)); // "Чётных чисел нет"
// ==================================================================================================

/* Задача 1________________________________________________________________________ */

/*a)надо узнать сколько денежных единиц в 1 проценте(делим на 100%); узнаем также сколько процентов составит цена после скидки; полученные денежн единицы умножим на полученные проценты - это будет цена после скидки (уже не в процентах а в денеж эквиваленте)

b)узнаем сколько  будет в деньгах послескидочная цена в одном проценте(делим на 100); теперь узнаем сколько будет часть налога именно в процентах(0.2 - это просто коэффициент без единиц);
умножим и получим финальный налог, который надо добавить сверху основной цены*/

const calculateFinalPrice = function (basePrice, discountPercent, taxRate) {
  const priceAfterDiscount = (basePrice / 100) * (100 - discountPercent);

  const taxAmount = (priceAfterDiscount / 100) * (taxRate * 100);
  const finalPrice = priceAfterDiscount + taxAmount;

  return finalPrice;
};

console.log(calculateFinalPrice(100, 10, 0.2));
console.log(calculateFinalPrice(150, 5, 0.4));

/* Задача 2__________________________________________________________________________*/
function checkAccess(userName, pass) {
  if (userName == "admin" && pass == "123456") return "Доступ разрешен";
  else return "Доступ запрещен";

  //   тернарно:
  //   return (userName === "admin" && pass === "123456") ? "Доступ разрешен" : "Доступ запрещен";
}

console.log(checkAccess("Vasya", "123450")); //access denied
console.log(checkAccess("admin", "123456")); //access granted

// можно записать вместо else и через наружный дефолтный return, за скобками снаружи - будет то же самое
function checkAccess(userName, pass) {
  if (userName === "admin" && pass === "123456") {
    return "Доступ разрешен";
  }

  return "Доступ запрещен";
}

console.log(checkAccess("Vasya", "123450")); //access denied
console.log(checkAccess("admin", "123456")); //access granted

/* Задача 3__________________________________________________________________________*/
let getTimeOfDay = (hour) => {
  switch (true) {
    case hour >= 0 && hour <= 5:
      return "Ночь";
    case hour >= 6 && hour <= 11:
      return "Утро";
    case hour >= 12 && hour <= 17:
      return "День";
    case hour >= 18 && hour <= 23:
      return "Вечер";
    default:
      return "Некорректное время";
  }
};

console.log(getTimeOfDay(3)); // Night
console.log(getTimeOfDay(10)); // Morning
console.log(getTimeOfDay(15)); // Afternoon
console.log(getTimeOfDay(20)); // Evening
console.log(getTimeOfDay(25)); // Incorrect Hour/Time

// else if вариант
// let getTimeOfDay = hour => {
//   if (hour < 0 || hour > 23) {
//     return "Некорректное время";
//   } else if (hour <= 5) {
//     return "Ночь";
//   } else if (hour <= 11) {
//     return "Утро";
//   } else if (hour <= 17) {
//     return "День";
//   } else {
//     return "Вечер";
//   }
// };

/* Задача 4__________________________________________________________________________*/
var findFirstEven = (start, end) => {
  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
      return i; // первое попавшееся четное число вернуть и прекратить выполнение
    }
  }
  return "Чётных чисел нет"; // если четных в последовательности не будет то просто выйдет из функции
};

console.log(findFirstEven(1, 10)); // 2 (4,6,8,10 - это не первые)
console.log(findFirstEven(9, 9)); // Чётных чисел нет (9=9)
console.log(findFirstEven(11, 15)); // 12(14-это второе четн, а не первое)

// аналог while
// var findFirstEven = (start, end) => {
//   let i = start;

//   while (i <= end) {
//     if (i % 2 === 0) {
//       return i;
//     }
//     i++;
//   }

//   return "Чётных чисел нет";
// };

// рекурсия из learn.javascript.ru - разделение на базовый случай и циклич вызов функции самой себя до уменьшения или окончания (например того же диапазона); как только нашло четное -возвращаем; если не находим, то просто ищем в остатке диапазона, продвигаемся до конца диапазона каждый раз на шаг вперед, пока диапазон вообще не закончится. Самый основной случай(базовый)- это где диапазон проверен полностью и закончен и искать там нечего (start>end)

// const findFirstEven = (start, end) => {
//   if (start > end) return "Чётных чисел нет";
//   if (start % 2 === 0) return start; //

//   return findFirstEven(++start, end); //
// };
