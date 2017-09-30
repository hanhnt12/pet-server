module.exports = function Cart(oldCart) {
  // items in cart
  // if have exist item then get from old cart else empty
  this.items = oldCart.items || {};
  this.totalQuanlity = oldCart.totalQuanlity || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  // add to cart
  this.add = function (item, id) {
    let storeItem = this.items[id];
    // checking item is existed in cart
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    // increate quanlity of this item
    storeItem.qty++;
    // calculate price of this item
    storeItem.price = storeItem.item.price * storeItem.qty;
    // in crease total quanlity in cart
    this.totalQuanlity++;
    // calculate total price in cart
    this.totalPrice += storeItem.item.price;
  }

  // reduce by one from cart
  this.reduce = function (item, id) {
    let storeItem = this.items[id];
    // checking item is existed in cart
    if (!storeItem) {
      storeItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    // increate quanlity of this item
    storeItem.qty--;
    // calculate price of this item
    storeItem.price = storeItem.item.price * storeItem.qty;
    // in crease total quanlity in cart
    this.totalQuanlity--;
    // calculate total price in cart
    this.totalPrice -= storeItem.item.price;
  }

  generateArray = function () {
    let arr = [];
    for (let id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  }
}