document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title") || "Untitled";
  const img = params.get("img") || "";
  const year = params.get("year") || "";
  const theme = params.get("theme") || "";
  const topic = params.get("topic") || "";

  document.getElementById("detail-title").textContent = title;
  document.getElementById("detail-meta").textContent = [year, theme, topic].filter(Boolean).join(" — ");
  document.getElementById("detail-img").src = img;
  document.getElementById("gallery-img").src = img;
  document.getElementById("room-img").src = img;
  document.getElementById("wall-img").src = img;

  // Tabs
  document.querySelectorAll(".view-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".view-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("view-" + tab.dataset.view).classList.add("active");
    });
  });

  // Zoom on hover
  const container = document.getElementById("zoom-container");
  const image = document.getElementById("detail-img");
  let zoomed = false;

  container.addEventListener("mousemove", (e) => {
    if (!zoomed) return;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    image.style.transformOrigin = `${x}% ${y}%`;
  });

  container.addEventListener("click", () => {
    zoomed = !zoomed;
    container.classList.toggle("zoomed", zoomed);
    image.style.transform = zoomed ? "scale(2.5)" : "scale(1)";
    if (!zoomed) image.style.transformOrigin = "center center";
  });

  container.addEventListener("mouseleave", () => {
    if (zoomed) {
      zoomed = false;
      container.classList.remove("zoomed");
      image.style.transform = "scale(1)";
      image.style.transformOrigin = "center center";
    }
  });

  // Wall preview tool
  const wallW = document.getElementById("wall-width");
  const wallH = document.getElementById("wall-height");
  const wallSurface = document.getElementById("wall-surface");
  const wallArtwork = document.getElementById("wall-artwork");
  const wallLabel = document.getElementById("wall-label");
  const artW = 60, artH = 80; // default artwork cm

  function updateWall() {
    const ww = Number(wallW.value) || 300;
    const wh = Number(wallH.value) || 250;
    const maxPx = 500;
    const scale = maxPx / Math.max(ww, wh);
    wallSurface.style.width = (ww * scale) + "px";
    wallSurface.style.height = (wh * scale) + "px";
    const imgEl = document.getElementById("wall-img");
    imgEl.style.width = (artW * scale) + "px";
    imgEl.style.height = (artH * scale) + "px";
    wallLabel.textContent = `${artW} × ${artH} cm artwork on ${ww} × ${wh} cm wall`;
  }

  wallW.addEventListener("input", updateWall);
  wallH.addEventListener("input", updateWall);
  updateWall();

  // Purchase options
  const productData = {
    print: { sizes: ["A4 (21×30 cm)", "A3 (30×42 cm)", "A2 (42×59 cm)", "A1 (59×84 cm)"] },
    cup: { sizes: ["Standard 11oz", "Large 15oz"] },
    tshirt: { sizes: ["S", "M", "L", "XL", "XXL"] },
    "tablet-skin": { sizes: ["iPad Mini", "iPad Air / 10\"", "iPad Pro 12.9\"", "Samsung Tab"] }
  };

  const productType = document.getElementById("product-type");
  const productSize = document.getElementById("product-size");

  function updateSizes() {
    const d = productData[productType.value];
    productSize.innerHTML = d.sizes.map(s => `<option value="${s}">${s}</option>`).join("");
  }

  productType.addEventListener("change", updateSizes);
  updateSizes();

  document.getElementById("btn-request-quote").addEventListener("click", async () => {
    const name = document.getElementById("quote-name").value.trim();
    const emailCb = document.getElementById("contact-email").checked;
    const phoneCb = document.getElementById("contact-phone").checked;
    const email = document.getElementById("quote-email").value.trim();
    const phone = document.getElementById("quote-phone").value.trim();
    if (!name) { alert("Please enter your name."); return; }
    if (!emailCb && !phoneCb) { alert("Please select at least one contact method."); return; }
    if (emailCb && !email) { alert("Please enter your email."); return; }
    if (phoneCb && !phone) { alert("Please enter your phone number."); return; }
    const product = productType.options[productType.selectedIndex].text;
    const size = productSize.options[productSize.selectedIndex].text;
    const message = document.getElementById("quote-message").value.trim();
    const res = await fetch("https://formspree.io/f/mkoegqqq", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, artwork: title, product, size, message })
    });
    if (res.ok) {
      alert(`Quote requested for: ${title} — ${product} (${size})\nWe'll be in touch soon. Thank you, ${name}!`);
    } else {
      alert("Something went wrong. Please try again or email info@ryanmichael.com.au directly.");
    }
  });

  // Toggle contact fields
  const emailGroup = document.getElementById("email-group");
  const phoneGroup = document.getElementById("phone-group");
  document.getElementById("contact-email").addEventListener("change", (e) => {
    emailGroup.style.display = e.target.checked ? "" : "none";
  });
  document.getElementById("contact-phone").addEventListener("change", (e) => {
    phoneGroup.style.display = e.target.checked ? "" : "none";
  });

  // Image protection: watermark overlay + disable right-click
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

  document.querySelectorAll(".view-panel, .related-card").forEach(addWatermark);

  document.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".detail-viewer, .related-card")) e.preventDefault();
  });

  // Blur images when page loses visibility (deters some capture tools)
  document.addEventListener("visibilitychange", () => {
    const imgs = document.querySelectorAll(".detail-viewer img, .related-card img");
    if (document.hidden) {
      imgs.forEach(img => img.style.filter = "blur(20px)");
    } else {
      setTimeout(() => imgs.forEach(img => img.style.filter = ""), 300);
    }
  });

  // Related works click
  document.querySelectorAll(".related-card").forEach(card => {
    card.addEventListener("click", () => {
      const p = new URLSearchParams({
        title: card.dataset.title,
        img: card.querySelector("img").src,
        year: card.dataset.year || "",
        theme: card.dataset.theme || "",
        topic: card.dataset.topic || ""
      });
      window.location.href = "artwork.html?" + p.toString();
    });
  });
});
