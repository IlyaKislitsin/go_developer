// 1. Написать функцию, преобразующую число в объект.
//    Передавая на вход число от 0 до 999, надо получить на выходе объект, в котором в соответствующих свойствах
//    описаны единицы, десятки и сотни. Например, для числа 245 надо получить следующий объект:
//    {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение
//    с помощью console.log и вернуть пустой объект.

console.log("Задание 1");
function decomposeNumber(number) {
    return (number >= 0 || number < 1000)
        ? {
            "единицы": number % 10,
            "десятки": Math.floor((number % 100) / 10),
            "сотни": Math.floor(number / 100)
        }
        : {};
}

const decomposedNumberByFunction = decomposeNumber(613);
console.log(decomposedNumberByFunction);

function DecomposedNumber(number) {
    if (number < 0 || number > 999) {
        return ;
    }
    this.units = number % 10;
    this.dozens = Math.floor((number % 100) / 10);
    this.hundreds = Math.floor(number / 100);
}

const decomposedNumberByConstructorFunction = new DecomposedNumber(345);
console.log(decomposedNumberByConstructorFunction);

class DecomposedNumberClass {
    constructor(number) {
        if (number < 0 || number > 999) {
            return {};
        }
        this.units = number % 10;
        this.dozens = Math.floor((number % 100) / 10);
        this.hundreds = Math.floor(number / 100);
    }

    // constructor(number) {
    //     if (number < 0 || number > 999) {
    //         return {};
    //     }
    //     this.units = number.toString()[0];
    //     this.dozens = number.toString()[1];
    //     this.hundreds = number.toString()[2];
    // }

    getNumber() {
        return this.hundreds * 100 + this.dozens * 10 + this.units;
    }
}

const decomposedNumberByClass = new DecomposedNumberClass(786);
console.log(decomposedNumberByClass);
console.log('DecomposedNumberClass number: ' + decomposedNumberByClass.getNumber());

// 2. Продолжить работу с интернет-магазином:
//    В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
//    Реализуйте такие объекты.
//    Перенести функционал подсчета корзины на объектно-ориентированную базу.
//    * Подумать над глобальными сущностями. К примеру, сущность «Продукт» в интернет-магазине актуальна не только для
//    корзины, но и для каталога. Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для
//    различных модулей сайта, но в разных местах давал возможность вызывать разные методы.

console.log("Задание 2");
class Product {
    constructor(name, price, vendorCode, sale) {
        this.name = name;
        this.price = price;
        this.vendorCode = vendorCode;
        this.sale = sale;
    }

    getPrice() {
        return this.price;
    }

    getSale() {
        return this.sale
            ? this.price * this.sale / 100
            : 0;
    }

    getPriceWithSale() {
        return this.price - this.getSale();
    }
}

class Basket {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    getBasketPrice() {
        let price = 0;
        for (let item of this.products) {
            price += item.getPrice();
        }
        return price;
    }

    getBasketSale() {
        let price = 0;
        this.products.forEach((product) => {
            price += product.getSale();
        });
        return price;
    }

    getBasketPriceWithSale() {
        return this.products.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.getPriceWithSale();
        }, 0);
    }
}

const basket = new Basket();
basket.addProduct(new Product('Смартфон', 27999, "5003456", 10));
basket.addProduct(new Product('Защитная плёнка', 299, "1008370", 0));
basket.addProduct(new Product('Чехол книжка', 999, "9007426", 0));

console.log("Общая сумма товаров в корзине: " + basket.getBasketPrice());
console.log("Сумма скидки: " + basket.getBasketSale());
console.log("Общая сумма товаров с учётом скидки: " + basket.getBasketPriceWithSale());
