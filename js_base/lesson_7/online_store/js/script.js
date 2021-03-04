document.addEventListener("DOMContentLoaded", function(event) {
    const catalog = new Catalog();
    catalog.draw();
    
    const basket = new Basket();
    basket.draw();

    document.addEventListener('click', (e) => {
        const elem = e.target;
        
        if (elem.classList.contains('add-to-basket')) {
            const product = elem.closest('.product');
            basket.addProduct(product, catalog.getCatalog());
        }

        if (elem.classList.contains('open-basket')) {
            basket.drawBasketPage();
        }

        if (elem.classList.contains('product_prev') || elem.classList.contains('product_image')) {
            const product = elem.closest('.product');
            showImage(product, catalog.getCatalog());
        }
    });
});

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
            ? Math.floor((this.price * this.sale / 100) * 100) / 100
            : 0;
    }

    getPriceWithSale() {
        return Math.floor((this.price - this.getSale()) * 100) / 100;
    }
}

class Basket {
    constructor() {
        this.products = [];
    }

    addProductToProductList(product) {
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
            return Math.floor((accumulator + currentValue.getPriceWithSale()) * 100) / 100;
        }, 0);
    }

    draw() {
        const basketContainer = createElementWithId('div', 'basket');
        const basketIcon = createElementWithId('div', 'basketIcon');
        basketIcon.onclick = function () {
            showHide(document.querySelector('#basketContent'));
        };
        const basketCount = createElementWithId('div', 'basketCount');
        const basketContent = createElementWithId('div', 'basketContent');
        showHide(basketContent);

        this.drawProductCount(basketCount);
        this.drawProductContent(basketContent);

        basketContainer.append(basketIcon);
        basketContainer.append(basketCount);
        basketContainer.append(basketContent);

        const container = document.querySelector('#page-header');
        container.append(basketContainer);
    }

    refresh() {
        const basketCount = document.querySelector('#basketCount');
        this.drawProductCount(basketCount);
        const basketContent = document.querySelector('#basketContent');
        this.drawProductContent(basketContent);
    }

    drawProductCount(countContainer) {
        const productBasketCount = this.getProductCount();
        if (productBasketCount){
            countContainer.textContent = productBasketCount;
            show(countContainer);
        } else {
            hide(countContainer);
        }
    }

    drawBasketPage() {
        let insertContent = '<div class="basket-page">';
        insertContent += '<h1 class="basket-page_caption">Корзина</h1><div class="basket-page_content">';
        insertContent += '<div class="block active">';
        insertContent += '<h3 class="block_caption">Состав корзины</h3><div class="block_content">';
        insertContent += this.getProductContent();
        insertContent += '</div></div>';
        insertContent += '<div class="block">';
        insertContent += '<h3 class="block_caption">Адрес доставки</h3><div class="block_content">';
        insertContent += '<input type="text" placeholder="Введите адрес доставки" />';
        insertContent += '</div></div>';
        insertContent += '<div class="block">';
        insertContent += '<h3 class="block_caption">Комментарий</h3><div class="block_content">';
        insertContent += '<textarea placeholder="Напишите комментарий к заказу"></textarea>';
        insertContent += '</div></div></div>';
        insertContent += '<div class="basket-page_nav">';
        insertContent += '<button class="button prev">Назад</button><button class="button next">Вперёд</button>';
        insertContent += '</div></div>';

        getPopup(insertContent);

        const prev = document.querySelector('.basket-page .button.prev');
        prev.onclick = function () {
            const activeBlock = document.querySelector('.basket-page .block.active');
            if (!activeBlock) {
                return ;
            }
            if (activeBlock.previousSibling) {
                activeBlock.classList.remove('active');
                activeBlock.previousSibling.classList.add('active');
            }
        };
        const next = document.querySelector('.basket-page .button.next');
        next.onclick = function () {
            const activeBlock = document.querySelector('.basket-page .block.active');
            if (!activeBlock) {
                return ;
            }
            if (activeBlock.nextSibling) {
                activeBlock.classList.remove('active');
                activeBlock.nextSibling.classList.add('active');
            }
        };
    }

    drawProductContent(contentContainer) {
        let insertContent = this.getProductContent();
        insertContent += '<button class="button open-basket">Открыть корзину</button>';
        contentContainer.textContent = '';
        contentContainer.insertAdjacentHTML('afterbegin', insertContent);
    }

    getProductContent() {
        const productBasketCount = this.getProductCount();
        return productBasketCount
            ? `<p>В корзине: ${this.getProductCount()} товаров на сумму ${this.getBasketPriceWithSale()} рублей</p>`
            : '<p>Корзина пуста</p>';
    }

    addProduct(product, catalog) {
        if (!product) {
            return ;
        }
        const vendorCode = product.getAttribute('data-vendorCode');
        const productObject = catalog.find(function (element) {
            return element.vendorCode === vendorCode;
        });
        this.addProductToProductList(productObject);
        this.refresh();
    }
}

class Catalog {
    constructor() {
        this.catalog = [];
        this.formCatalog();
    }

    getCatalog() {
        return this.catalog;
    }

    formCatalog() {
        this.catalog.push(new Product('Смартфон', 24999, '1', 10, [
            {
                'src': 'images/honor20_black.jpg',
                'alt': 'Смартфон'
            },
            {
                'src': 'images/honor20_blue.jpg',
                'alt': 'Смартфон'
            }
        ]));
        this.catalog.push(new Product('Чехол-книжка', 999, '2', 15, [
            {
                'src': 'images/honor20_case.jpg',
                'alt': 'Чехол-книжка'
            }
        ]));
        this.catalog.push(new Product('Умные часы', 7999, '3', 5, [
            {
                'src': 'images/honor_watch.jpg',
                'alt': 'Умные часы'
            }
        ]));
    }

    draw() {
        const catalogContainer = document.createElement('div');
        catalogContainer.id = 'catalog';
        let insertContent = '<h1 class="title">Каталог</h1>';
        insertContent += '<div class="catalog_content">';
        for (let product of this.catalog) {
            const image = product.images[0];
            insertContent += `<div class="product" data-vendorCode="${product.vendorCode}">`
                + `<h3 class="product_name">${product.name}</h3>`
                + `<div class="product_prev"><img class="product_image" src="${image.src}" alt="${image.alt}"></div>`
                + `<p class="product_price">Цена: ${product.price} руб.</p>`
                + `<p class="product_sale">Скидка: ${product.sale}%</p>`
                + `<button class="button add-to-basket">Купить</button></div>`;
        }
        insertContent += '</div>';

        catalogContainer.insertAdjacentHTML('beforeend', insertContent);

        const container = document.querySelector('#page-content');
        container.append(catalogContainer);
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

function showImage(product, catalog) {
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

    let first = true;
    let insertContent = '<div class="images_gallery"><div class="image_container">';
    for (let image of images) {
        insertContent += `<div class="image ${first ? 'active' : ''}">`
            + `<img class="product_image" src="${image.src}" alt="${image.alt}">`
            + `</div>`;
        if (first) {
            first = false;
        }
    }
    insertContent += '</div>';
    insertContent += '<div class="images_gallery_nav">';
    insertContent += '<button class="button prev"><</button><button class="button next">></button>';
    insertContent += '</div></div>';

    getPopup(insertContent);

    const prev = document.querySelector('.images_gallery .button.prev');
    prev.onclick = function () {
        const activeImage = document.querySelector('.images_gallery .image.active');
        if (!activeImage) {
            return ;
        }
        if (activeImage.previousSibling) {
            activeImage.classList.remove('active');
            activeImage.previousSibling.classList.add('active');
        }
    };
    const next = document.querySelector('.images_gallery .button.next');
    next.onclick = function () {
        const activeImage = document.querySelector('.images_gallery .image.active');
        if (!activeImage) {
            return ;
        }
        if (activeImage.nextSibling) {
            activeImage.classList.remove('active');
            activeImage.nextSibling.classList.add('active');
        }
    };

    if (!document.querySelector('#popup .images_gallery')) {
        return ;
    }

    document.addEventListener('keydown', imageGalleryKeyDownEvents);
}

function getPopup(insertContent) {
    let popup = createElementWithId('div', 'popup');
    const popupContent = createElementWithId('div', 'popupContent');
    const popupClose = createElementWithId('div', 'popupClose');
    popupClose.onclick = function () {
        popup.remove();
        if (popup.querySelector('.images_gallery')) {
            document.removeEventListener('keydown', imageGalleryKeyDownEvents);
        }
        popup = null;
    };

    popupContent.insertAdjacentHTML('beforeend', insertContent);
    popup.append(popupContent);
    popup.append(popupClose);

    const container = document.querySelector('body');
    container.append(popup);
}

function imageGalleryKeyDownEvents(e) {
    const activeImage = document.querySelector('.images_gallery .image.active');
    if (!activeImage) {
        return ;
    }
    if (e.key !== 'ArrowLeft' && activeImage.previousSibling) {
        activeImage.classList.remove('active');
        activeImage.previousSibling.classList.add('active');
    }

    if (e.key !== 'ArrowRight' && activeImage.nextSibling) {
        activeImage.classList.remove('active');
        activeImage.nextSibling.classList.add('active');
    }
}
