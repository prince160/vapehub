document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.querySelector('.products');
    const cartButton = document.querySelector('.cart-button');
    const cartCount = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');

    let cart = [];

    // Exemple de données pour les produits (vous pouvez ajouter plus d'informations)
    const productsData = [
        { name: 'Produit 1', price: 20, image: 'img/V-flash/1.JPEG', quantity: 10, category: 'categorie1', priceRange: '0-20'},
        { name: 'Produit 2', price: 25, image: 'img/V-flash/2.JPEG', quantity: 8, category: 'categorie2', priceRange: '20-50'},
        { name: 'Produit 3', price: 30, image: 'img/V-flash/3.JPEG', quantity: 15, category: 'categorie2', priceRange: '20-50' },
        { name: 'Produit 4', price: 18, image: 'img/V-flash/4.JPEG', quantity: 12, category: 'categorie2', priceRange: '0-20' },
        { name: 'Produit 5', price: 22, image: 'img/V-flash/5.JPEG', quantity: 7, category: 'categorie1', priceRange: '20-50' },
        { name: 'Produit 6', price: 28, image: 'img/V-flash/2.JPEG', quantity: 20, category: 'categorie1', priceRange: '20-50' },
        { name: 'Produit 7', price: 35, image: 'img/V-flash/1.JPEG', quantity: 5, category: 'categorie2', priceRange: '20-50' },
        { name: 'Produit 8', price: 15, image: 'img/V-flash/3.JPEG', quantity: 18, category: 'categorie2', priceRange: '0-20' },
        { name: 'Produit 7', price: 35, image: 'img/V-flash/1.JPEG', quantity: 5, category: 'categorie2', priceRange: '20-50' },
        { name: 'Produit 8', price: 15, image: 'img/V-flash/3.JPEG', quantity: 18, category: 'categorie2', priceRange: '0-20' },
    ];

 // Génération des produits dans le DOM
 productsData.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    // Ajoutez des classes en fonction de la catégorie et du prix du produit
    productElement.classList.add(`category-${product.category}`);
    productElement.classList.add(`price-${product.priceRange}`);

    // Crée le contenu HTML pour chaque produit
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Prix: $${product.price}</p>
        <p>Quantité restante: ${product.quantity}</p>
        <button class="add-to-cart" onclick="addToCart('${product.name}')">Ajouter au panier</button>
    `;

    // Gestion des événements pour afficher/masquer le bouton "Ajouter au panier"
    productElement.addEventListener('mouseenter', function () {
        productElement.querySelector('.add-to-cart').style.display = 'block';
    });

    productElement.addEventListener('mouseleave', function () {
        productElement.querySelector('.add-to-cart').style.display = 'none';
    });

    // Ajoute chaque produit au conteneur des produits
    productsContainer.appendChild(productElement);
});

// Fonction pour ajouter un produit au panier
window.addToCart = function (productName) {
    const product = productsData.find(p => p.name === productName);

    if (product && product.quantity > 0) {
        const existingCartItem = cart.find(item => item.name === productName);

        if (existingCartItem) {
            existingCartItem.cartQuantity++; // Augmente la quantité du produit existant dans le panier
        } else {
            cart.push({ ...product, cartQuantity: 1 });
        }

        product.quantity--; // Décrémente la quantité du produit
        updateCartUI();
        animateAddToCart(productName);
    }
};


// Fonction pour mettre à jour l'interface utilisateur du panier
function updateCartUI() {
    const cartItemCount = cart.reduce((total, product) => total + product.cartQuantity, 0);
    cartCount.textContent = cartItemCount;

    // Calculer le total des prix des articles dans le panier
    const cartTotal = cart.reduce((total, product) => total + (product.cartQuantity * product.price), 0);

    // Afficher le total dans la balise prévue
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }

    // Vous pouvez également mettre à jour d'autres éléments de l'affichage du panier ici
}

// Fonction pour animer l'ajout au panier
// Fonction pour animer l'ajout au panier
function animateAddToCart(productName) {
    const addToCartMessage = document.getElementById('addToCartMessage');

    if (addToCartMessage) {
        addToCartMessage.style.display = 'block';

        // Supprime la classe après l'animation
        addToCartMessage.addEventListener('animationend', function () {
            addToCartMessage.style.display = 'none';
        });
    }
}

// Fonction pour afficher le contenu du panier
window.showCart = function () {
    cartItemsContainer.innerHTML = ''; // Réinitialise le contenu du panier

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.setAttribute('data-name', product.name);

        const cartItemDetails = document.createElement('div');
        cartItemDetails.classList.add('cart-item-details');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        const productInfo = document.createElement('div');
        productInfo.innerHTML = `
            <p>${product.name} - $${product.price}</p>
            <label>Quantité:</label>
            <input type="number" value="${product.cartQuantity}" min="1" style="width: 50px;" onchange="updateCartItemQuantity('${product.name}', this.value)">
        `;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Retirer';
        removeButton.onclick = function () {
            removeFromCart(product.name);
        };

        cartItemDetails.appendChild(productImage);
        cartItemDetails.appendChild(productInfo);
        cartItem.appendChild(cartItemDetails);
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);
    });

    // Affiche le modal du panier
    cartModal.style.display = 'block';
};

// Fonction pour fermer le modal du panier
window.closeCartModal = function () {
    cartModal.style.display = 'none';
};

// Gestionnaire d'événements pour fermer le modal du panier si l'utilisateur clique à l'extérieur du modal
window.onclick = function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};

// Fonction pour retirer un produit du panier
window.removeFromCart = function (productName) {
    const productIndex = cart.findIndex(p => p.name === productName);
    if (productIndex !== -1) {
        const removedProduct = cart.splice(productIndex, 1)[0];
        removedProduct.quantity += removedProduct.cartQuantity; // Ajoute la quantité au stock
        updateCartUI();

        const cartItem = document.querySelector(`.cart-item[data-name="${productName}"]`);
        if (cartItem) {
            cartItem.classList.add('remove-animation');
            cartItem.addEventListener('animationend', function () {
                cartItemsContainer.removeChild(cartItem);
            });
        }
    }
};

// Fonction pour mettre à jour la quantité d'un produit dans le panier
window.updateCartItemQuantity = function (productName, newQuantity) {
    const productIndex = cart.findIndex(p => p.name === productName);

    if (productIndex !== -1) {
        const parsedQuantity = parseInt(newQuantity, 10);
        const maxQuantity = cart[productIndex].quantity; // Utilisez la quantité disponible dans le panier

        if (!isNaN(parsedQuantity) && parsedQuantity >= 1 && parsedQuantity <= maxQuantity) {
            cart[productIndex].cartQuantity = parsedQuantity;
            updateCartUI();
        } else {
            // Restaurer la quantité précédente si la saisie n'est pas valide
            document.querySelector(`.cart-item[data-name="${productName}"] input`).value = cart[productIndex].cartQuantity;
        }
    }
};

// Fonction factice pour simuler la redirection vers la page de confirmation de commande
window.checkout = function () {
    console.log("Redirection vers la page de confirmation de commande");
};
});