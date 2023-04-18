import { menuArray } from './data.js';
import Menu from './Menu.js';
import Orders from './Orders.js';


if(document.querySelector('.menu-cards')) {
    new Menu(menuArray);
}


// Instantiate a new object from the order class
const order = new Orders();

function handleAddOrder(orderId) {
    order.addOrder(orderId);
}

function handleRemoveOrder(orderId) {
    order.removeOrder(orderId);
}

function handleOrder() {
    order.orderNow();
}


addEventListener('click', function(e) {
    // Listen for the add order click
    if(e.target.dataset.add) {
        handleAddOrder(e.target.dataset.add);

    } else if(e.target.dataset.remove) {
        handleRemoveOrder(e.target.dataset.remove);

    } else if(e.target.dataset.completeorder) {
        handleOrder();
    }
});

