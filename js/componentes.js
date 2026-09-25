/*
 * componentes.js — Q-LAB
 * Esto es para sincronizar el diagrama SVG fijo de la página "Componentes"
 * con la tarjeta que el usuario está leyendo: resalta la capa
 * correspondiente del criostato y el punto activo del riel
 * lateral. Si el navegador no soporta IntersectionObserver,
 * se muestran todas las capas activas (degradación segura).
 */
(function () {
  var cards = document.querySelectorAll(".qc-card[data-layer]");
  var layers = document.querySelectorAll(".qc-layer");
  var dots = document.querySelectorAll(".qc-rail .qc-dot");

  if (!cards.length || !layers.length) return;

  function activate(layerId) {
    layers.forEach(function (layer) {
      layer.classList.toggle("is-active", layer.id === layerId);
    });
    dots.forEach(function (dot) {
      dot.classList.toggle("is-active", dot.dataset.dot === layerId);
    });
    cards.forEach(function (card) {
      card.classList.toggle("is-current", card.dataset.layer === layerId);
    });
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activate(entry.target.dataset.layer);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    cards.forEach(function (card) {
      observer.observe(card);
    });
    activate(cards[0].dataset.layer);
  } else {
    layers.forEach(function (layer) {
      layer.classList.add("is-active");
    });
  }
})();
