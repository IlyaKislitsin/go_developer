// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

console.log("Задание 1");
let num = 2;
while (num <= 100) {
    if ((num === 2 || num === 3 || num === 5 || num === 7) || (num%2 && num%3 && num%5 && num%7)) {
        console.log(num);
    }
    num++;
}

// 2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины.
// Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
// Товары в корзине хранятся в массиве. Задачи:
// - a) Организовать такой массив для хранения товаров в корзине;
// - b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

console.log("Задание 2");
let basket = [
    {
        'name': 'Защитная плёнка',
        'price': 100
    },
    {
        'name': 'Чехол-книжка',
        'price': 999
    },
    {
        'name': 'Смартфон',
        'price': 12999
    },
];
function countBasketPrice(basket) {
    let totalPrice = 0;
    for (let item of basket) {
        totalPrice += item.price;
    }
    return totalPrice;
}
console.log("Общая сумма товаров в корзине: " + countBasketPrice(basket));

// 3.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
//    for(…){// здесь пусто}

console.log("Задание 3");
for(let i = 0; i < 10; console.log(i++)) {}

// 4. *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
// x
// xx
// xxx
// xxxx
// xxxxx

console.log("Задание 4");
let arr = new Array(20);
for (let i = 0, len = arr.length; i<len; i++) {
    arr[i] = 'x';
    console.log(arr.join(''));
}
