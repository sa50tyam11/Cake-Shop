// Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  /* ================== SCROLL PROGRESS ================== */
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const progress = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    const bar = document.getElementById("scrollProgress");
    if (bar) bar.style.width = progress + "%";
  });

  /* ================== HERO LETTER ANIMATION ================== */
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent.trim();
    heroTitle.textContent = "";
    text.split("").forEach((ch, idx) => {
      const span = document.createElement("span");
      span.textContent = ch;
      span.classList.add("hero-char");
      span.style.transitionDelay = idx * 35 + "ms"; // 35ms between letters
      heroTitle.appendChild(span);
    });
    // allow layout then animate
    requestAnimationFrame(() => {
      heroTitle.classList.add("animate");
    });
  }

  /* ================== PARALLAX HERO IMAGE ================== */
  const parallaxEls = document.querySelectorAll(".parallax");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0.2");
      el.style.transform = `translateY(${y * speed}px)`;
    });
  });

  /* ================== SCROLL REVEAL (sections, spotlight, cards, story) ================== */
  const revealEls = document.querySelectorAll(".reveal, .story-inner, .card");
  const cards = document.querySelectorAll(".card");

  // give cards stagger delay via CSS variable
  cards.forEach((card, idx) => {
    card.style.transitionDelay = idx * 120 + "ms";
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ================== CTA PULSE ON SCROLL ================== */
  const buyButtons = document.querySelectorAll(".add-btn, .spotlight-btn");
  const buyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("buy-pulse");
        }
      });
    },
    { threshold: 0.6 }
  );
  buyButtons.forEach((btn) => buyObserver.observe(btn));

  /* ================== VIEW MENU BUTTON SCROLL ================== */
  const viewMenuBtn = document.getElementById("viewMenuBtn");
  const favoritesSection = document.getElementById("favorites");
  if (viewMenuBtn && favoritesSection) {
    viewMenuBtn.addEventListener("click", () => {
      favoritesSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ================== CART LOGIC & MODAL ================== */
  let cartCount = 0;
  const cartLink = document.querySelector(".nav-cart");
  const modal = document.getElementById("cartModal");
  const modalProductName = document.querySelector(".modal-product-name");
  const modalClose = document.querySelector(".modal-close");
  const modalOk = document.querySelector(".modal-ok");

  function openModal(name) {
    if (!modal) return;
    modalProductName.textContent = `"${name}" has been added to your cart.`;
    modal.classList.add("is-visible");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-visible");
  }

  // product cards
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.product || "Bakery item";
      cartCount++;
      if (cartLink) cartLink.textContent = `Cart (${cartCount})`;
      openModal(name);
    });
  });

  // spotlight chef pick
  const spotlightBtn = document.querySelector(".spotlight-btn");
  if (spotlightBtn) {
    spotlightBtn.addEventListener("click", () => {
      const name = "Cocoa Crust Berry Cake (Chef Pick)";
      cartCount++;
      if (cartLink) cartLink.textContent = `Cart (${cartCount})`;
      openModal(name);
    });
  }

  modalClose?.addEventListener("click", closeModal);
  modalOk?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /* ================== CONTACT FORM (demo) ================== */
  const contactForm = document.querySelector(".contact-form");
  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! (Demo only)");
    contactForm.reset();
  });
});
