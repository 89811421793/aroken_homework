// Задание 1.
// Дан массив пользователей:
// const users = [
//   { name: 'Alex', age: 24, isAdmin: false },
//   { name: 'Bob', age: 13, isAdmin: false },
//   { name: 'John', age: 31, isAdmin: true },
//   { name: 'Jane', age: 20, isAdmin: false },
//]
// Добавьте в конец массива двух пользователей:
// { name: 'Ann', age: 19, isAdmin: false },
// { name: 'Jack', age: 43, isAdmin: true }

// Задание 2.
// Используя массив пользователей users из предыдущего задания, напишите функцию getUserAverageAge(users), которая возвращает средний возраст пользователей.

// Задание 3.
// Используя массив пользователей users из предыдущего задания, напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.

// Задание 4.
// Напишите функцию first(arr, n), которая возвращает первые n элементов массива. Если n == 0, возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

// _______________________________________________________________________________________________________________
/* ЗАДАНИЕ 1*/
// МУТАБЕЛЬНО
const users = [
  {name: "Alex", age: 24, isAdmin: false},
  {name: "Bob", age: 13, isAdmin: false},
  {name: "John", age: 31, isAdmin: true},
  {name: "Jane", age: 20, isAdmin: false},
];

users.push(
  {name: "Ann", age: 19, isAdmin: false},
  {name: "Jack", age: 43, isAdmin: true},
);

console.log(users);

// МУТАБЕЛЬНО ПО ОЧЕРЕДИ
// users[users.length] = {name: "Ann", age: 19, isAdmin: false};
// users[users.length] = {name: "Jack", age: 43, isAdmin: true};
// console.log(users);

// МУТАБЕЛЬНО СО SPLICE (текущий length как стартовый индекс - туда и вставляем, т.е в конец)
// users.splice(
//   users.length,
//   0,
//   {name: "Ann", age: 19, isAdmin: false},
//   {name: "Jack", age: 43, isAdmin: true},
// );
// console.log(users);

// ИММУТАБЕЛЬНО ЧЕРЕЗ ОПЕРАТОР РАСШИРЕНИЯ (без учета push length=6)
// const moreUsers = [
//   ...users,
//   {name: "Ann", age: 19, isAdmin: false},
//   {name: "Jack", age: 43, isAdmin: true},
// ];

// console.log(moreUsers);

// ИММУТАБЕЛЬНО ЧЕРЕЗ конкатенацию
// const addUsers = users.concat(
//   {name: "Ann", age: 19, isAdmin: false},
//   {name: "Jack", age: 43, isAdmin: true},
// );

// console.log(addUsers);

// __________________________________________________________________________________________________________________

/* ЗАДАНИЕ 2*/
// метод reduce часто используется для аккамулирования/сложения или присоединения, в него встроен цикл
const getAverageAge = users =>
  users.length === 0
    ? 0 // если элементов в массиве нет, то нечего складывать и цикла не будет
    : users.reduce((sum, user) => sum + user.age, 0) / users.length;

const averageAge = getAverageAge(users);
console.log(averageAge);

// обычный for
// const getAverageAge = users => {
//   if (users.length === 0) return 0;

//   let totalAge = 0;
//   for (let i = 0; i < users.length; i++) {
//     totalAge += users[i].age;
//   }
//   return totalAge / users.length;
// };
// console.log(getAverageAge(users));

// for/of для массива
// const getAverageAge = users => {
//   if (users.length === 0) return 0;

//   let totalAge = 0;
//   for (const user of users) {
//     totalAge += user.age;
//   }
//   return totalAge / users.length;
// };
// console.log(getAverageAge(users));

// в forEach уже встроен цикл
// const getAverageAge = users => {
//   if (users.length === 0) return 0;

//   let totalAge = 0;
//   users.forEach(user => {
//     totalAge += user.age;
//   });
//   return totalAge / users.length;
// };

// console.log(getAverageAge(users));
// _______________________________________________________________________________________________

/* ЗАДАНИЕ 3*/
// в методе фильтрации по определенному критерию уже есть цикл, кот по очереди применится к кажд эл-ту
const getAdminList = users => users.filter(user => user.isAdmin);

const admins = getAdminList(users);
console.log(admins);

// for/of и добавление в конец
// const getAdminList = users => {
//   const result = [];
//   for (const user of users) {
//     if (user.isAdmin) result.push(user);
//   }
//   return result;
// };
// console.log(getAdminList(users));

// reduce-метод(если админ то к исходному массиву добавить польз-ля (оператор расширения используется здесь), если нет, то начать с пустого массива для аккамулятора, т.е типа  возвращаем аккумулятор acc в том же виде, в котором он был, ничего в него не добавляя - если не соответствует пользователь, то новом массиве ничего и не будет)
// const res = users.reduce(
//   (acc, user) => (user.isAdmin ? [...acc, user] : acc),
//   [],
// );
// console.log(res);
// ____________________________________________________________________________________________________

/* ЗАДАНИЕ 4*/
function first(arr, n) {
  if (n === undefined) return [arr[0]];

  if (n === 0) return [];

  let result = [];

  for (let i = 0; i < n && i < arr.length; i++) {
    // до n но за длину массива не выходим
    result.push(arr[i]);
  }

  return result;
}

const fruits = ["Яблоко", "Банан", "Манго", "Киви"];

console.log(first(fruits)); // ["Яблоко"], n не передали, значит undefined
console.log(first(fruits, 0)); // [] - пустой
console.log(first(fruits, 2)); // ["Яблоко", "Банан"]

// попытка рекурсии - базовый случай+постепенное уменьшение в сторону базового случая
/*function first(arr, n) {
  if (n === undefined) return [arr[0]];
  if (n === 0) return [];

  // Ограничим n длиной массива
  if (n > arr.length) n = arr.length;

  // Рекурсивный шаг: берем результат для (n - 1) элементов и добавляем текущий n-ый элемент
  let result = first(arr, n - 1);
  result.push(arr[n - 1]);

  return result;
}

const fruits = ["Яблоко", "Банан", "Манго", "Киви"];

console.log(first(fruits)); 
console.log(first(fruits, 0));
console.log(first(fruits, 2)); 
*/

// for/of
/*const first = function(arr, n) {
  if (n === undefined) return [arr[0]];
  if (n === 0) return [];

  let result = [];
  let counter = 0;

  for (let fruit of arr) {
    if (counter < n) {
      result.push(fruit);
      counter++;
    } else {
      break; //как набрали n элементов - покинуть цикл
    }
  }

  return result;
};

const fruits = ["Яблоко", "Банан", "Манго", "Киви"];

console.log(first(fruits));   
console.log(first(fruits, 0)); 
console.log(first(fruits, 3)); 
*/

// forEach
/*const first = function (arr, n) {
  if (n === undefined) return [arr[0]];
  if (n === 0) return [];

  let result = [];

  arr.forEach((fruit, index) => {
    // Добавляем, только если текущий индекс меньше n
    if (index < n) {
      result.push(fruit);
    }
  });

  return result;
};

const fruits = ["Яблоко", "Банан", "Манго", "Киви"];

console.log(first(fruits)); 
console.log(first(fruits, 0)); 
console.log(first(fruits, 2)); 
*/
