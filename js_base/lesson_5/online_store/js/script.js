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

    getProductCount() {
        return this.products.length;
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

// 2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
// Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// - Пустая корзина должна выводить строку «Корзина пуста»;
// - Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
function addBasketOnPage(basket) {
    const basketContainer = document.createElement('div');
    basketContainer.id = 'basket';

    let insertContent = `<h1 class="title">Корзина</h1>`;
    insertContent += basket.getProductCount()
        ? `<p>В корзине: ${basket.getProductCount()} товаров на сумму ${basket.getBasketPriceWithSale()} рублей</p>`
        : '<p>Корзина пуста</p>';
    basketContainer.insertAdjacentHTML('afterbegin', insertContent);

    const container = document.querySelector('#page-content');
    container.append(basketContainer);
}

addBasketOnPage(basket);

const catalog = [
    {
        'name': 'Смартфон 1',
        'price': '27999',
        'sale': '10',
    },
    {
        'name': 'Смартфон 2',
        'price': '49999',
        'sale': '15',
    },
    {
        'name': 'Смартфон 3',
        'price': '11999',
        'sale': '5',
    },
];

// 3. Сделать так, чтобы товары в каталоге выводились при помощи JS:
// Создать массив товаров (сущность Product);
// При загрузке страницы на базе данного массива генерировать вывод из него.
// HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.

function addCatalogOnPage(catalog) {
    const catalogContainer = document.createElement('div');
    catalogContainer.id = 'catalog';
    let insertContent = '<h1 class="title">Каталог</h1>';
    for (let product of catalog) {
        insertContent += `<div class="product"><h3 class="product_name">${product.name}</h3>`
            + `<p class="product_price">Цена: ${product.price} руб.</p>`
            + `<p class="product_sale">Скидка: ${product.sale}%</p></div>`;
    }

    catalogContainer.insertAdjacentHTML('beforeend', insertContent);

    const container = document.querySelector('#page-content');
    container.append(catalogContainer);
}

addCatalogOnPage(catalog);