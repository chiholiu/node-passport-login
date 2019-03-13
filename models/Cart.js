module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id, image, qty) {
        let storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = { item: item, image: image, qty: 0, price: 0, id: id};
        }

        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        console.log(this.totalQty);
        this.totalPrice += storedItem.item.price;
    };

    // shopping cart
    this.reduceByOne = function(id) {
        if(this.items[id].qty <= 1) return;
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
    };

    this.addByOne = function(id) {
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.price;
        this.totalQty++;
        this.totalPrice += this.items[id].item.price;
    };

    // product list
    this.reduceProduct = function(id) {
        
    }

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].item.price;
        delete this.items[id];
    };
    
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}
