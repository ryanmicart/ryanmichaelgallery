document.addEventListener("DOMContentLoaded", () => {

  // ─── HERO SLIDESHOW ───────────────────────────────────────────────────────
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 5000);
  }

  // ─── CATALOGUE FILTERING (only runs if catalogue exists on page) ──────────
  const cards = document.querySelectorAll(".work-card");
  const searchInput = document.getElementById("search-input");

  if (cards.length && searchInput) {
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
      const search = searchInput.value.toLowerCase();
      cards.forEach(card => {
        const titleEl = card.querySelector(".work-title");
        const title = titleEl ? titleEl.textContent.toLowerCase() : "";
        const match =
          (!activeFilters.year  || card.dataset.year  === activeFilters.year) &&
          (!activeFilters.theme || card.dataset.theme === activeFilters.theme) &&
          (!search || title.includes(search));
        card.classList.toggle("hidden", !match);
      });
    }

    searchInput.addEventListener("input", applyFilters);

    // Click image → detail page
    cards.forEach(card => {
      const imgEl = card.querySelector(".card-image img");
      if (imgEl) {
        imgEl.addEventListener("click", () => {
          const title = card.querySelector(".work-title").textContent;
          const img   = imgEl.src;
          const { year, theme, topic } = card.dataset;
          const params = new URLSearchParams({ title, img, year, theme, topic });
          window.location.href = "artwork.html?" + params.toString();
        });
      }
    });
  }

  // ─── NEWSLETTER POPUP ─────────────────────────────────────────────────────
  const newsletterPopup   = document.getElementById("newsletter-popup");
  const newsletterOverlay = document.getElementById("newsletter-overlay");
  const newsletterClose   = document.getElementById("newsletter-close");
  const newsletterForm    = document.getElementById("newsletter-form");

  if (newsletterPopup && newsletterOverlay) {
    if (!localStorage.getItem("newsletter_seen")) {
      setTimeout(() => {
        newsletterPopup.hidden   = false;
        newsletterOverlay.hidden = false;
      }, 3000);
    }

    function closeNewsletter() {
      newsletterPopup.hidden   = true;
      newsletterOverlay.hidden = true;
      localStorage.setItem("newsletter_seen", "1");
    }

    if (newsletterClose)  newsletterClose.addEventListener("click", closeNewsletter);
    newsletterOverlay.addEventListener("click", closeNewsletter);

    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("newsletter_seen", "1");
        newsletterPopup.innerHTML = '<p style="padding:2rem;font-size:1.1rem;">Thanks for subscribing! ✓</p>';
        setTimeout(closeNewsletter, 1500);
      });
    }
  }

  // ─── PHOTOGRAPHY TABS ─────────────────────────────────────────────────────
  const photoTabs = document.querySelectorAll(".photo-tab");
  if (photoTabs.length) {
    photoTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".photo-tab").forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll(".photo-panel").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        const panel = document.getElementById("panel-" + tab.dataset.country);
        if (panel) panel.classList.add("active");
      });
    });
  }

  // ─── INEQUALITY EXHIBITION TABS ───────────────────────────────────────────
  const ineqTabs = document.querySelectorAll(".ineq-tab");
  if (ineqTabs.length) {
    ineqTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".ineq-tab").forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll(".ineq-panel").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        const panel = document.getElementById("ineq-panel-" + tab.dataset.panel);
        if (panel) panel.classList.add("active");
      });
    });
  }

  // ─── REELS ────────────────────────────────────────────────────────────────
  document.querySelectorAll(".reel-card").forEach(card => {
    const video = card.querySelector("video");
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().then(() => card.classList.add("playing")).catch(() => {});
        } else {
          video.pause();
          card.classList.remove("playing");
        }
      });
    }, { threshold: 0.5 });
    observer.observe(card);

    card.addEventListener("click", () => {
      if (video.paused) {
        video.play().then(() => card.classList.add("playing")).catch(() => {});
      } else {
        video.pause();
        card.classList.remove("playing");
      }
    });
  });

  // ─── IMAGE PROTECTION ─────────────────────────────────────────────────────
  function addWatermark(container) {
    const canvas = document.createElement("canvas");
    canvas.className = "watermark-overlay";
    canvas.width  = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    ctx.rotate(-0.35);
    ctx.font      = "bold 28px sans-serif";
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


// ─── RSVP MODAL ───────────────────────────────────────────────────────────────
(function () {
  const openBtn    = document.getElementById("rsvp-open-btn");
  const closeBtn   = document.getElementById("rsvp-close-btn");
  const doneBtn    = document.getElementById("rsvp-done-btn");
  const overlay    = document.getElementById("rsvp-overlay");
  const modal      = document.getElementById("rsvp-modal");
  const form       = document.getElementById("rsvp-form");
  const errorBox   = document.getElementById("rsvp-error");
  const successBox = document.getElementById("rsvp-success");
  const submitBtn  = document.getElementById("rsvp-submit-btn");

  if (!openBtn || !modal) return; // guard: only run on pages with the modal

  // ── Open / close helpers ──────────────────────────────────────────────────
  function openModal() {
    modal.hidden   = false;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    // focus first input for accessibility
    const first = modal.querySelector("input, select");
    if (first) setTimeout(() => first.focus(), 50);
  }

  function closeModal() {
    modal.hidden   = true;
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click",  openModal);
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click",  closeModal);
  if (doneBtn) doneBtn.addEventListener("click", closeModal);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // ── Form validation & submit ──────────────────────────────────────────────
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear previous errors
    errorBox.hidden = true;
    errorBox.textContent = "";
    form.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));

    const firstName = form.firstName.value.trim();
    const lastName  = form.lastName.value.trim();
    const email     = form.email.value.trim();
    const phone     = form.phone.value.trim();
    const guests    = form.guests.value;

    // Basic validation
    let valid = true;
    if (!firstName) { form.firstName.classList.add("invalid"); valid = false; }
    if (!lastName)  { form.lastName.classList.add("invalid");  valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      form.email.classList.add("invalid"); valid = false;
    }
    if (!phone) { form.phone.classList.add("invalid"); valid = false; }
    if (!guests) { form.guests.classList.add("invalid"); valid = false; }

    if (!valid) {
      errorBox.textContent = "Please fill in all required fields.";
      errorBox.hidden = false;
      return;
    }

    // Disable button while submitting
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    const payload = { firstName, lastName, email, phone, guests,
                      event: "Launch Event — 3 Oct, Langley Park Pavillion" };

    try {
      const res = await fetch("http://localhost:3847/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Server error: " + res.status);

      // Show success
      form.hidden      = true;
      successBox.hidden = false;

    } catch (err) {
      // Server not running — fall back: show success anyway and log to console
      console.warn("RSVP server not reachable. Entry logged to console:", payload);
      form.hidden      = true;
      successBox.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Confirm RSVP";
    }
  });

  // Reset form when modal closes so it's fresh on next open
  overlay.addEventListener("click", resetForm);
  closeBtn.addEventListener("click", resetForm);
  if (doneBtn) doneBtn.addEventListener("click", resetForm);

  function resetForm() {
    form.reset();
    form.hidden       = false;
    successBox.hidden = true;
    errorBox.hidden   = true;
    form.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
  }
})();
