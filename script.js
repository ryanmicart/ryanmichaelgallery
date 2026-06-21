document.addEventListener("DOMContentLoaded", () => {
  // Catalogue filtering — chip buttons
  const cards = document.querySelectorAll(".work-card");
  const activeFilters = { year: "", theme: "" };

  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.filter;
      document.querySelectorAll(`.chip[data-filter="${group}"]`).forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilters[group] = chip.dataset.value;
      applyFilters();
    });
  });

  function applyFilters() {
    const search = document.getElementById("search-input").value.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector(".work-title").textContent.toLowerCase();
      const match =
        (!activeFilters.year || card.dataset.year === activeFilters.year) &&
        (!activeFilters.theme || card.dataset.theme === activeFilters.theme) &&
        (!search || title.includes(search));
      card.classList.toggle("hidden", !match);
    });
  }

  document.getElementById("search-input").addEventListener("input", applyFilters);

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

  // Wishlist (kept for future use — no UI buttons currently)
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

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
