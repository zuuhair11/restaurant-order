class Menu {
    constructor(menu) {
        this.menuCards = document.querySelector('.menu-cards');
        this.render(menu);
    }

    
    getMenuHtml(menu) {
        let menuHtml = '';

        menu.forEach(function(card) {
            const ingredients = card.ingredients.map( item => {
                return `<span>${item}</span>`;

            }).join(', ');

            menuHtml += `
                <div class="card-item">
                    <p class="emoji">${card.emoji}</p>
                    <div class="item-description">
                        <p class="name">${card.name}</p>
                        <p class="info">${ingredients}</p>
                        <p class="price">$${card.price}</p>
                    </div>
                    <button data-add="${card.id}" id="add-order" class="add-order">+</button>
                </div>
            `;
        });
        
        return menuHtml;
    }

    render(menu) {
        this.menuCards.innerHTML = this.getMenuHtml(menu);
    }
}


export default Menu;
