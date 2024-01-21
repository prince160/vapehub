document.addEventListener('DOMContentLoaded', function () {
    const newProductsContainer = document.querySelector('.new-products');
    const cartCount = document.getElementById('cartCount');


    let cart = [];

    // Exemple de données pour les nouveaux produits (vous pouvez ajouter plus d'informations)
    const newProductsData = [
        { name: 'Nouveau Produit 1', price: 25, image: 'img/new-products/1.JPEG', quantity: 20, category: 'categorie3', priceRange: '20-50' },
        { name: 'Nouveau Produit 2', price: 30, image: 'img/new-products/2.JPEG', quantity: 15, category: 'categorie3', priceRange: '20-50' },
        { name: 'Nouveau Produit 3', price: 22, image: 'img/new-products/3.JPEG', quantity: 18, category: 'categorie3', priceRange: '20-50' },
        // Ajoutez d'autres nouveaux produits ici
    ];

    // Génération des nouveaux produits dans le DOM
    newProductsData.forEach(newProduct => {
        const newProductElement = document.createElement('div');
        newProductElement.classList.add('product');

        // Ajoutez des classes en fonction de la catégorie et du prix du nouveau produit
        newProductElement.classList.add(`category-${newProduct.category}`);
        newProductElement.classList.add(`price-${newProduct.priceRange}`);

        // Crée le contenu HTML pour chaque nouveau produit
        newProductElement.innerHTML = `
            <img src="${newProduct.image}" alt="${newProduct.name}">
            <h3>${newProduct.name}</h3>
            <p>Prix: $${newProduct.price}</p>
            <p>Quantité restante: ${newProduct.quantity}</p>
            <button class="add-to-cart" onclick="addToCart('${newProduct.name}')">Ajouter au panier</button>
        `;

        // Gestion des événements pour afficher/masquer le bouton "Ajouter au panier"
        newProductElement.addEventListener('mouseenter', function () {
            newProductElement.querySelector('.add-to-cart').style.display = 'block';
        });

        newProductElement.addEventListener('mouseleave', function () {
            newProductElement.querySelector('.add-to-cart').style.display = 'none';
        });

        // Ajoute chaque nouveau produit au conteneur des nouveaux produits
        newProductsContainer.appendChild(newProductElement);
    });

    // Fonction pour ajouter un produit au panier
    window.addToCart = function (productName) {
        const product = newProductsData.find(p => p.name === productName);

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
});