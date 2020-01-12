class Good {
    constructor (element) {
        this.id = element.id;
        this.img = element.img;
        this.title = element.title;
        this.price = element.price;
        this.weight = element.weight;
        this.amount = element.amount;
        this.counter = element.counter;

        this.commonCounter = 0;
        this.commonPrise = 0;


        this.template = `
            <div class="col-md-6" data-id="%ID_PLACE%">
                <div class="card mb-4">
                    <img class="product-img" src="img/roll/%IMG_PLACE%" alt="">
                    <div class="exist none">Уже в корзине!</div>
                    <div class="card-body text-center">
                        <h4 class="item-title">%TITLE_PLACE%</h5>
                        <p><small class="text-muted amount">%AMOUNT_PLACE% шт.</small></p>
        
                        <div class="details-wrapper">
                            <div class="items">
                                <div class="items__control" data-onclick='getCounterMinus'>-</div>
                                <div class="items__current orderAmount">%NUMBER_OF_ROLLES%</div>
                                <div class="items__control" data-onclick='getCounterPlus'>+</div>
                            </div>
        
                            <div class="price">
                                <div class="price__weight">%WEIGHT_PLACE%г.</div>
                                <div class="price__currency priceAmount">%PRICE_PLACE% BYN</div>
                            </div>
                        </div>
        
                        <button class="btn btn-block btn-outline-warning" data-onclick="addInCart">+ в корзину</button>
                        
                    </div>
                </div>
            </div>
        `;

        this.cartTemplate = `
            <div class="cart-item" data-cart-id="%ID_CART_PLACE%">
                <div class="cart-item__top">
                    <div class="cart-item__img">
                        <img src="img/roll/%IMAGE_CART_PLACE%" alt="">
                    </div>
                    
                    <div class="cart-item__desc">
                        <div class="cart-item__title">%TITLE_CART_PLACE%</div>
                        <div class="cart-item__weight">%AMOUNT_CART_PLACE% шт. / %WEIGHT_CART_PLACE%г.</div>
        
                        <div class="cart-item__details">
        
                            <div class="items items--small">
                            <div class="items__control" data-onclick='getCommonMinus'>-</div>
                            <div class="items__current orderAmount">%NUMBER_OF_ROLLES%</div>
                            <div class="items__control" data-onclick='getCommonPlus'>+</div>
                            </div>
        
                            <div class="price">
                                <span class="price__currency" data-cart-price>%PRICE_CART_PLACE%</span><span class="cart-rouble">BYN</span>
                            </div>
        
                        </div>
        
                    </div>
                    <div class="cart-item__delete" data-onclick="deleteFromCart">x</div>
        
                </div>
            </div>
        `;
    }

    initGood () {
        const item = document.createElement("div");

        item.innerHTML = this.template
            .replace("%ID_PLACE%", this.id)
            .replace("%IMG_PLACE%", this.img)
            .replace("%TITLE_PLACE%", this.title)
            .replace("%PRICE_PLACE%", this.price.toFixed(2))
            .replace("%WEIGHT_PLACE%", this.weight)
            .replace("%AMOUNT_PLACE%", this.amount)
            .replace("%NUMBER_OF_ROLLES%", this.counter);

        this.goodHanlder(item);

        return item.firstElementChild;
    }

    initCart () {
        const item = document.createElement("div");

        item.innerHTML = this.cartTemplate
            .replace("%ID_CART_PLACE%", this.id)
            .replace("%IMAGE_CART_PLACE%", this.img)
            .replace("%TITLE_CART_PLACE%", this.title)
            .replace("%PRICE_CART_PLACE%", this.price.toFixed(2))
            .replace("%WEIGHT_CART_PLACE%", this.weight)
            .replace("%AMOUNT_CART_PLACE%", this.amount)
            .replace("%NUMBER_OF_ROLLES%", this.counter);

        for (const element of item.querySelectorAll("[data-onclick]")) {
            const handlerName = element.dataset.onclick;

            element.addEventListener("click", () => {
                this[handlerName]();
                console.log(handlerName)
            })
        }

        return item.firstElementChild;   
    }

    goodHanlder (item) {
        for (const element of item.querySelectorAll("[data-onclick]")) {
            const handlerName = element.dataset.onclick;

            element.addEventListener("click", () => {
                const goodId = event.target.closest("[data-id]").dataset.id;
        
                let goodElem = document.querySelector("[data-id='" + goodId + "']");
                let cartElem = document.querySelector("[data-cart-id='" + goodId + "']");
    
                if (cartElem && parseInt(goodId) == parseInt(cartElem.dataset.cartId)) {
                    const hint = goodElem.querySelector(".exist");
                    hint.classList.remove("none");
                    setTimeout(() => {
                        hint.classList.add("none");
                    }, 1500)
                    return false;
                }

                this[handlerName]();
            });
        }
    }

    getCounterMinus () {
        if (this.counter > 1) {
            this.counter--;
            event.target.nextElementSibling.textContent = this.counter;
        }
    }

    getCounterPlus () {
        this.counter++;
        event.target.previousElementSibling.textContent = this.counter;
    }

    getCommonPlus () {
        this.commonCounter++;
        event.target.previousElementSibling.textContent = this.commonCounter;

        cart.updateTotalPrice();

        cart.updateElementPrice(this);

        this.calculateDeliveryCost();
        this.checkCart();
    }

    getCommonMinus () {
        if (this.commonCounter > 1) {
            this.commonCounter--;
            event.target.nextElementSibling.textContent = this.commonCounter;

            cart.updateTotalPrice();

            cart.updateElementPrice(this);

            this.calculateDeliveryCost();
            this.checkCart();
        }
    }

    calculateDeliveryCost () {}

    checkCart () {}

    addInCart () {}

    deleteFromCart () {}

}