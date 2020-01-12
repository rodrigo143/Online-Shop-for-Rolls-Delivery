class Cart {
    constructor () {
        this.goods = [];

        this.totalPrice = 0;

        this.basketWindow = document.querySelector("[data-cart]");
        this.emptyBasket = document.querySelector("#emptyCart");
        this.notEmptyCart = document.querySelector("#notEmptyCart");
        this.totalPriceElement = document.querySelector("[data-total-price]");

        this.emptyBasket.style.display = "none";
        this.notEmptyCart.style.display = "block";

        this.totalPriceElement.textContent = this.totalPrice;

        this.updateTotalPrice();
    }

    updateTotalPrice() {
        this.totalPrice = 0;

        for (const good of this.goods) {
            this.totalPrice += (good.price * good.commonCounter);
        }

        this.totalPriceElement.textContent = this.totalPrice;
    }

    updateDeliveryPrice (html) {
        let roubleElement = document.querySelector(".roubleDelivery");

        if (parseInt(html.textContent) > 40) {
            document.querySelector("[data-delivery-cost]").textContent = "Бесплатно";
            document.querySelector("[data-delivery-cost]").classList.add("free");
            roubleElement.style.display = "none";
        } else {
            document.querySelector("[data-delivery-cost]").textContent = "200";
            document.querySelector("[data-delivery-cost]").classList.remove("free");
            roubleElement.style.display = "inline";
        }
        if (this.goods.length == 0) {
            document.querySelector("[data-delivery-cost]").textContent = "0";
            document.querySelector("[data-delivery-cost]").classList.remove("free");
            roubleElement.style.display = "inline";
        }
    }

    updateElementPrice (good) {
        let elementPrice = event.target.parentElement
            .nextElementSibling.querySelector("[data-cart-price]");
        elementPrice.textContent = good.price * good.commonCounter;
    }

    check () {
        if (this.goods.length == 0) {
            this.emptyBasket.style.display = "block";
            this.notEmptyCart.style.display = "none";
        } else {
            this.emptyBasket.style.display = "none";
            this.notEmptyCart.style.display = "block";
        }
    }

    addGood (good) {
        if (!this.goods.includes(good)) {
            this.goods.push(good);
        }

        good.commonCounter = good.counter;
        //good.commonPrice = good.price * good.commonCounter;

        this.basketWindow.append(good.initCart());

        this.updateTotalPrice();
    }

    deleteGood (good) {
        this.goods.splice(this.goods.indexOf(good), 1);
        event.target.closest("[data-cart-id]").remove();
        this.updateTotalPrice();
    }
}