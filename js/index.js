const shop = new Shop;
const cart = new Cart;
let totalPriceElement = document.querySelector("[data-total-price]");

shop.loadGoods();
shop.showGoods();

if (cart.goods.length == 0) {
    cart.emptyBasket.style.display = "block";
    cart.notEmptyCart.style.display = "none";
}

for (const good of shop.goods) {
    good.addInCart = () => {
        cart.addGood(good);

        good.counter = 1;
        event.target.parentElement.querySelector(".orderAmount").textContent = good.counter;

        cart.updateTotalPrice();
        good.calculateDeliveryCost()

        good.checkCart();
    }

    good.calculateDeliveryCost = () => {
        cart.updateDeliveryPrice(totalPriceElement);
    }

    good.checkCart = () => {
        cart.check();
    }

    good.deleteFromCart = () => {
        cart.deleteGood(good);
        cart.updateTotalPrice();

        good.calculateDeliveryCost = () => {
            cart.updateDeliveryPrice(totalPriceElement);
        }
        good.calculateDeliveryCost();

        good.checkCart = () => {
            cart.check();
        }
        good.checkCart();
    }
}
