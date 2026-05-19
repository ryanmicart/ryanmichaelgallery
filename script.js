document.addEventListener("DOMContentLoaded", () => {
  // Catalogue filtering
  const filters = document.querySelectorAll("#filter-year, #filter-theme, #filter-topic");
  const cards = document.querySelectorAll(".work-card");
  const clearBtn = document.getElementById("clear-filters");

  function applyFilters() {
    const year = document.getElementById("filter-year").value;
    const theme = document.getElementById("filter-theme").value;
    const topic = document.getElementById("filter-topic").value;
    const search = document.getElementById("search-input").value.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector(".work-title").textContent.toLowerCase();
      const match =
        (!year || card.dataset.year === year) &&
        (!theme || card.dataset.theme === theme) &&
        (!topic || card.dataset.topic === topic) &&
        (!search || title.includes(search));
      card.classList.toggle("hidden", !match);
    });
  }

  filters.forEach(f => f.addEventListener("change", applyFilters));
  document.getElementById("search-input").addEventListener("input", applyFilters);
  clearBtn.addEventListener("click", () => {
    filters.forEach(f => (f.value = ""));
    document.getElementById("search-input").value = "";
    cards.forEach(c => c.classList.remove("hidden"));
  });

  // Click image → detail page
  cards.forEach(card => {
    card.querySelector(".card-image img").addEventListener("click", () => {
      const title = card.querySelector(".work-title").textContent;
      const img = card.querySelector(".card-image img").src;
      const { year, theme, topic } = card.dataset;
      const params = new URLSearchParams({ title, img, year, theme, topic });
      window.location.href = "artwork.html?" + params.toString();
    });
  });

  // Cart
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }

  function renderCart() {
    const countEl = document.getElementById("cart-count");
    const itemsEl = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    countEl.textContent = cart.length;
    itemsEl.innerHTML = cart.length === 0
      ? '<p style="color:#999;font-size:0.9rem;">Your cart is empty.</p>'
      : cart.map((item, i) => `
        <div class="cart-item">
          <div class="cart-item-info">${item.title}<small>${item.size} — $${item.price}</small></div>
          <button class="cart-item-remove" data-index="${i}" aria-label="Remove">&times;</button>
        </div>`).join("");
    totalEl.textContent = cart.reduce((sum, item) => sum + Number(item.price), 0).toLocaleString();
    itemsEl.querySelectorAll(".cart-item-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        cart.splice(Number(btn.dataset.index), 1);
        saveCart();
        renderCart();
      });
    });
  }

  // Toggle sidebar
  const sidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("cart-overlay");
  document.getElementById("cart-toggle").addEventListener("click", () => { sidebar.hidden = false; overlay.hidden = false; });
  document.getElementById("cart-close").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  function closeCart() { sidebar.hidden = true; overlay.hidden = true; }

  // Add to cart — find sibling select
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const select = btn.parentElement.querySelector(".size-select");
      const option = select.options[select.selectedIndex];
      cart.push({ title: btn.dataset.title, size: option.text, price: option.value });
      saveCart();
      renderCart();
      sidebar.hidden = false;
      overlay.hidden = false;
    });
  });

  // Prevent select clicks from navigating to detail page
  document.querySelectorAll(".size-select").forEach(s => s.addEventListener("click", e => e.stopPropagation()));

  // Wishlist
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  function renderWishlist() {
    document.querySelectorAll(".wishlist-btn").forEach(btn => {
      const title = btn.dataset.title;
      const saved = wishlist.includes(title);
      btn.textContent = saved ? "\u2665" : "\u2661";
      btn.classList.toggle("saved", saved);
    });
  }

  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = btn.dataset.title;
      if (wishlist.includes(title)) {
        wishlist = wishlist.filter(t => t !== title);
      } else {
        wishlist.push(title);
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist();
    });
  });

  renderWishlist();

  // Checkout placeholder
  document.getElementById("cart-checkout").addEventListener("click", () => {
    if (cart.length === 0) return;
    alert("Redirecting to payment...\n(Connect Stripe here)");
  });

  renderCart();

  // Newsletter popup — first-time visitors only
  if (!localStorage.getItem("newsletter_seen")) {
    setTimeout(() => {
      document.getElementById("newsletter-popup").hidden = false;
      document.getElementById("newsletter-overlay").hidden = false;
    }, 3000);
  }
  document.getElementById("newsletter-close").addEventListener("click", closeNewsletter);
  document.getElementById("newsletter-overlay").addEventListener("click", closeNewsletter);
  document.getElementById("newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("newsletter_seen", "1");
    document.getElementById("newsletter-popup").innerHTML = '<p style="padding:2rem;font-size:1.1rem;">Thanks for subscribing! ✓</p>';
    setTimeout(closeNewsletter, 1500);
  });
  function closeNewsletter() {
    document.getElementById("newsletter-popup").hidden = true;
    document.getElementById("newsletter-overlay").hidden = true;
    localStorage.setItem("newsletter_seen", "1");
  }

  // Image protection: watermark overlay + disable right-click on images
  function addWatermark(container) {
    const canvas = document.createElement("canvas");
    canvas.className = "watermark-overlay";
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    ctx.rotate(-0.35);
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#000";
    for (let y = 0; y < 900; y += 100) {
      for (let x = -200; x < 800; x += 280) {
        ctx.fillText("© Ryan Michael", x, y);
      }
    }
    container.appendChild(canvas);
  }

  document.querySelectorAll(".card-image, .related-card").forEach(addWatermark);

  document.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".card-image, .detail-viewer, .related-card")) e.preventDefault();
  });

  document.addEventListener("visibilitychange", () => {
    const imgs = document.querySelectorAll(".card-image img");
    if (document.hidden) {
      imgs.forEach(img => img.style.filter = "blur(20px)");
    } else {
      setTimeout(() => imgs.forEach(img => img.style.filter = ""), 300);
    }
  });
});
