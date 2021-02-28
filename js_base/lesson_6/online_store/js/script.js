class Product {
    constructor(name, price, vendorCode, sale, images) {
        this.name = name;
        this.price = price;
        this.vendorCode = vendorCode;
        this.sale = sale;
        this.images = images;
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

function createElementWithId(tag, id) {
    const element = document.createElement(tag);
    element.id = id;
    return element;
}

function showHide(elem) {
    elem.classList.toggle('hidden');
}

function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}

function addBasketOnPage(basket) {
    const basketContainer = createElementWithId('div', 'basket');
    const basketIcon = createElementWithId('div', 'basketIcon');
    basketIcon.onclick = function () {
        showHide(document.querySelector('#basketContent'));
    };
    const basketCount = createElementWithId('div', 'basketCount');
    const basketContent = createElementWithId('div', 'basketContent');
    showHide(basketContent);

    basketProductCount(basket, basketCount);
    basketProductContent(basket, basketContent);

    basketContainer.append(basketIcon);
    basketContainer.append(basketCount);
    basketContainer.append(basketContent);

    const container = document.querySelector('#page-header');
    container.append(basketContainer);
}

function refreshBasket(basket) {
    const basketCount = document.querySelector('#basketCount');
    basketProductCount(basket, basketCount);
    const basketContent = document.querySelector('#basketContent');
    basketProductContent(basket, basketContent);
}

function basketProductCount(basket, basketCount) {
    const productBasketCount = basket.getProductCount();
    if (productBasketCount){
        basketCount.textContent = productBasketCount;
        show(basketCount);
    } else {
        hide(basketCount);
    }
}

function basketProductContent(basket, basketContent) {
    const productBasketCount = basket.getProductCount();
    let insertContent = productBasketCount
        ? `<p>В корзине: ${basket.getProductCount()} товаров на сумму ${basket.getBasketPriceWithSale()} рублей</p>`
        : '<p>Корзина пуста</p>';
    basketContent.innerHTML = '';
    basketContent.insertAdjacentHTML('afterbegin', insertContent);
}

function getCatalog() {
    const catalog = [];
    catalog.push(new Product('Смартфон', 24999, '1', 10, [
        {
            'src': 'images/honor20_black.jpg',
            'alt': 'Смартфон'
        },
        {
            'src': 'images/honor20_blue.jpg',
            'alt': 'Смартфон'
        }
    ]));
    catalog.push(new Product('Чехол-книжка', 999, '2', 15, [
        {
            'src': 'images/honor20_case.jpg',
            'alt': 'Чехол-книжка'
        }
    ]));
    catalog.push(new Product('Умные часы', 7999, '3', 5, [
        {
            'src': 'images/honor_watch.jpg',
            'alt': 'Умные часы'
        }
    ]));

    return catalog;
}

function addCatalogOnPage(catalog) {
    const catalogContainer = document.createElement('div');
    catalogContainer.id = 'catalog';
    let insertContent = '<h1 class="title">Каталог</h1>';
    insertContent += '<div class="catalog_content">';
    for (let product of catalog) {
        const image = product.images[0];
        insertContent += `<div class="product" data-vendorCode="${product.vendorCode}">`
            + `<h3 class="product_name">${product.name}</h3>`
            + `<div class="product_prev"><img class="product_image" src="${image.src}" alt="${image.alt}"></div>`
            + `<p class="product_price">Цена: ${product.price} руб.</p>`
            + `<p class="product_sale">Скидка: ${product.sale}%</p>`
            + `<button class="add-to-basket">Купить</button></div>`;
    }
    insertContent += '</div>';

    catalogContainer.insertAdjacentHTML('beforeend', insertContent);

    const container = document.querySelector('#page-content');
    container.append(catalogContainer);
}

function addToBasket(product) {
    if (!product) {
        return ;
    }
    const vendorCode = product.getAttribute('data-vendorCode');
    const productObject = catalog.find(function (element) {
        return element.vendorCode === vendorCode;
    });
    basket.addProduct(productObject);
    refreshBasket(basket);
}

function showImage(product) {
    if (!product) {
        return ;
    }
    const vendorCode = product.getAttribute('data-vendorCode');
    const productObject = catalog.find(function (element) {
        return element.vendorCode === vendorCode;
    });
    showImageGallery(productObject.images);
}

function showImageGallery(images) {
    if (!images.length) {
        return ;
    }

    let popup = createElementWithId('div', 'popup');
    const popupContent = createElementWithId('div', 'popupContent');
    const popupClose = createElementWithId('div', 'popupClose');
    popupClose.onclick = function () {
        popup.remove();
        popup = null;
    };

    let first = true;
    let insertContent = '<div class="images_gallery">';
    for (let image of images) {
        insertContent += `<div class="image ${first ? 'active' : ''}">`
            + `<img class="product_image" src="${image.src}" alt="${image.alt}">`
            + `</div>`;
        if (first) {
            first = false;
        }
    }
    insertContent += '</div>';
    popup.append(popupContent);
    popup.append(popupClose);
    popupContent.insertAdjacentHTML('beforeend', insertContent);

    const container = document.querySelector('body');
    container.append(popup);
}

const basket = new Basket();
addBasketOnPage(basket);

const catalog = getCatalog();
addCatalogOnPage(catalog);

document.addEventListener('click', (e) => {
    const elem = e.target;
    if (elem.classList.contains('add-to-basket')) {
        const product = elem.closest('.product');
        addToBasket(product);
    }

    if (elem.classList.contains('product_prev') || elem.classList.contains('product_image')) {
        const product = elem.closest('.product');
        showImage(product);
    }
});
