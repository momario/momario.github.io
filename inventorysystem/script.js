$(document).ready(function() {
  let products = [];

  loadProducts();

  function loadProducts() {
    $.getJSON('products.json')
      .done(data => {
        products = data.map(product => ({
          id: product.id,
          description: product.description,
          anzahl: 0,
          tags: product.tag || [], // Ensure tags is an array
        }));
        renderProducts();
        const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        updateCartContent(cartItems);
      })
      .fail(() => {
        console.error('Error loading products.json');
        alert('Fehler beim Laden der Produktdaten.');
      });
  }

  function renderProducts() {
    const $container = $('#product-container');
    $container.empty();

    products.forEach((product, index) => {
      // Generate HTML for tags
      const tagsHtml = product.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');

      const $productDiv = $(`
        <div class="product-wrapper">
          <div class="flex-item-small product-img-wrapper">
            <span class="product-id">${product.id}</span>
            <br>
            <img src="images/${product.id}.jpeg" alt="${product.description}" onerror="this.onerror=null;this.src='images/noimage.jpg';" />
          </div>
          <div class="flex-item-large">
            <div class="product-column-wrapper">
              <div class="product-description-wrapper">
                <span class="product-description">${product.description}</span><br><br>
              </div>
              <div class="product-tag-num-wrapper">
                <div class="flex-item-small">
                  <span class="product-tag-num-heading">Tags:</span><br>
                  ${tagsHtml}
                </div>
                <div class="flex-item-small product-num-wrapper">
                  <span class="product-tag-num-heading">Anzahl:</span><br>
                  <input class="product-num" type="number" min="0" placeholder="${product.anzahl}" data-id="${product.id}">
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
      $container.append($productDiv);
    });
  }

  function updateCartContent(cartItems) {
    if (cartItems.length === 0) {
      $('#cart-content').text('Keine Artikel im Warenkorb.');
      return;
    }

    const cartContent = cartItems.map(item => (
      `${item.id}\n${item.description}\nAnzahl: ${item.anzahl}\n\n`
    )).join('');

    $('#cart-content').text(cartContent);
  }

  const $productContainer = $('#product-container');

  $productContainer.on('input', '.product-num', function() {
    const id = $(this).data('id');
    let value = parseInt($(this).val(), 10);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    const product = products.find(p => p.id === id);
    if (product) {
      product.anzahl = value;
    }
  });

  $('#inWarenkorbLegen').on('click', function() {
    const cartItems = products
      .filter(product => product.anzahl > 0)
      .map(({ id, description, anzahl }) => ({ id, description, anzahl }));

    if (cartItems.length === 0) {
      alert('Keine Produkte mit Anzahl > 0 ausgewählt.');
      return;
    }

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href = 'warenkorb.html';
  });

  $('#copy-cart').on('click', function() {
    const cartText = $('#cart-content').text();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cartText)
        .then(() => alert('Warenkorb wurde kopiert!'))
        .catch(() => alert('Fehler beim Kopieren des Warenkorbs.'));
    } else {
      alert('Clipboard API nicht verfügbar.');
    }
  });

  $('#home').on('click', function() {
    // Redirect to index.html
    window.location.href = 'index.html';
  });

  $('#reset').on('click', function() {
    // Clear the search input
    $('#search').val('');
  });

  let searchTimeout;
  $('#search').on('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchValue = $(this).val().toLowerCase();
      $('.product-wrapper').each(function() {
        const descrText = $(this).find('.product-description').text().toLowerCase();
        $(this).toggle(descrText.includes(searchValue));
      });
    }, 300);
  });
});