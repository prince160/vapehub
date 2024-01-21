document.addEventListener('DOMContentLoaded', function () {
  const categorieProduitSelect = document.getElementById('categorie-produit');
  const filtrePrixSelect = document.getElementById('filtre-prix');
  const productsContainer = document.querySelector('.products');

  categorieProduitSelect.addEventListener('change', filtrerProduits);
  filtrePrixSelect.addEventListener('change', filtrerProduits);

  function filtrerProduits() {
      const categorieSelectionnee = categorieProduitSelect.value;
      const prixSelectionne = filtrePrixSelect.value;

      // Afficher les produits filtrés
      afficherProduits(categorieSelectionnee, prixSelectionne);
  }

  function afficherProduits(categorie, prix) {
      const products = document.querySelectorAll('.product');

      products.forEach(product => {
          const categorieMatch = categorie === 'tous' || product.classList.contains(`category-${categorie}`);
          const prixMatch = prix === 'tous' || product.classList.contains(`price-${prix}`);

          if (categorieMatch && prixMatch) {
              product.style.display = 'block';
          } else {
              product.style.display = 'none';
          }
      });
  }
});

  document.addEventListener("DOMContentLoaded", function() {
    var animationContainer = document.querySelector('.animation-container');
    var animationTriggered = false;

    window.addEventListener('scroll', function() {
        // Vérifiez si l'utilisateur a atteint la position de la section
        var sectionPosition = animationContainer.getBoundingClientRect().top;

        // Vérifiez si l'animation n'a pas encore été déclenchée et que l'utilisateur est proche de la section
        if (!animationTriggered && sectionPosition < window.innerHeight / 2) {
            // Déclenchez l'animation
            animationContainer.classList.add('visible');
            animationTriggered = true;
        }
    });
});


