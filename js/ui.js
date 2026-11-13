/* ===== UI HELPERS (Member A): modal, toast, formatting ===== */
App.ui = {
  esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  },
  price(item) {
    if (item.type === "free") return "Free";
    if (item.type === "swap") return "Swap";
    return Number(item.price).toLocaleString("en-US") + " ₫";
  },
  openModal(id) { document.getElementById(id).hidden = false; },
  closeModals() { document.querySelectorAll(".modal").forEach(m => m.hidden = true); },
  toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(this._t);
    this._t = setTimeout(() => t.hidden = true, 2200);
  },
  initMotion() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    this._revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          this._revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    this.observeReveals = root => {
      const elements = [];
      if (root.matches?.("[data-reveal]")) elements.push(root);
      elements.push(...root.querySelectorAll("[data-reveal]"));
      elements.forEach(element => {
        if (!element.classList.contains("is-visible")) this._revealObserver.observe(element);
      });
    };
    document.documentElement.classList.add("motion-ready");
    this.observeReveals(document);
  }
};
