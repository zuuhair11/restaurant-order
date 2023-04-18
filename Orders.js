import { menuArray } from "./data.js";


class Orders {
    constructor() {
        this.orderContainer = document.querySelector('.orders-container');
        this.renderOrderHtml();
        this.orders = document.querySelector('.orders');
        this.basket = [];
    }


    addOrder(orderId) {
        this.basket.unshift(orderId);
        const myOrders = this.basket.map(function(id) {
            return menuArray.find(function(order) {
                return order.id == id;
            });
        });

        this.getOrdersHtml(myOrders);
    }

    removeOrder(orderId) {
        this.basket = this.basket.filter(function(id) {
            return id != orderId;
        });

        const myOrders = this.basket.map(function(id) {
            return menuArray.find(function(order) {
                return order.id == id;
            });
        });

        this.getOrdersHtml(myOrders);
    }

    orderNow() {
        // Grab the card details element
        const cardDetails = this.orderContainer.parentElement.nextElementSibling;
        // Change the opcaity to a bit more unvisible
        cardDetails.previousElementSibling.style.opacity = 0.5;
        cardDetails.previousElementSibling.previousElementSibling.style.opacity = 0.5;

        // Show the card details to the user
        cardDetails.classList.remove('hidden');
        
        cardDetails.addEventListener('click', () => this.handlePlayClick(cardDetails));
    }

    handlePlayClick(cardDetails) {
        const name = document.querySelector('input#name');
        if(name.value.trim().length !== 0 ) {
            cardDetails.classList.add('hidden');
            cardDetails.previousElementSibling.style.opacity = 1;
            cardDetails.previousElementSibling.previousElementSibling.style.opacity = 1;
            
            this.basket = [];
            this.renderOrderHtml();

            cardDetails.classList.add('showTheMessage')
            cardDetails.innerHTML = `
                <h2>Thanks, ${name.value}! Your order is on its way!</h2>
            `;

            setTimeout(function() {
                cardDetails.classList.replace("showTheMessage", 'hidden');
                cardDetails.innerHTML = `
                    <h2>Enter card details</h2>
                    <div class="inputs-group">
                        <input type="text" id="name" class="input-field" placeholder="Enter your name" />
                        <input type="text" id="card-numbber" class="input-field" placeholder="Enter card number" />
                        <input type="text" id="cvv" class="input-field" placeholder="Enter CVV" />
                    </div>
                    
                    <button class="complete-button">Play</button>
                `;
            }, 3000);
        }
    }


    getOrdersHtml(myOrders) {
        if(myOrders.length > 0) {
            const basket = myOrders.map(function(order) {
                return `
                    <div class="order">
                        <div class="left-side">
                            <p class="order-name">${order.name}</p>
                            <small data-remove="${order.id}" class="action">remove</small>    
                        </div>
                        <p class="price">$${order.price}</p>
                    </div>
                `;
            }).join('');
    
            const totalPrice = myOrders.reduce(function(accumulator, currentValue) {
                return accumulator += currentValue.price;
            }, 0);
    
            this.renderOrderHtml(basket, totalPrice);

        } else {
            this.renderOrderHtml([], 0);
        }
    }
    

    renderOrderHtml(basket=[], totalPrice=0) {
        if(basket.length === 0) {
            this.orderContainer.innerHTML = '';

        } else {
            this.orderContainer.innerHTML = `
                <h2>Your order</h2>
                <div class="orders">
                    ${basket}
                </div>

                <div class="total">
                    <h2>Total Price:</h2>
                    <p class="total-price">$${totalPrice}</p>
                </div>
                
                <button data-completeOrder=${true} class="order-button">Complete order</button>
            `;
        }
    }
}


export default Orders;
