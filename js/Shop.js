class Shop {
    constructor () {
        this.goods = [];

        this.shopWindow = document.querySelector("#shopWindow");
    }
    
    loadGoods () {
        const database = 
        [
            {
                id: 1,
                img: "philadelphia.jpg",
                title: "Филадельфия хит ролл",
                price: 9.5,
                weight: 180,
                amount: 8,
                counter: 1
            },
            {
                id: 2,
                img: "zapech-california.jpg",
                title: "Запеченый ролл «Калифорния»",
                price: 6.5,
                weight: 182,
                amount: 8,
                counter: 1
            },
            {
                id: 3,
                img: "philadelphia.jpg",
                title: "Филадельфия",
                price: 10,
                weight: 230,
                amount: 8,
                counter: 1
            },
            {
                id: 4,
                img: "philadelphia.jpg",
                title: "Калифорния темпура",
                price: 7,
                weight: 205,
                amount: 6,
                counter: 1
            },
        ]

        for (const elem of database) {
            const good = new Good(elem);

            this.goods.push(good)
        }
    }

    showGoods () {

        for (const good of this.goods) {
            this.shopWindow.append(good.initGood())
        }
    }
}