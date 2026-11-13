/* ===== LISTINGS (Member C): filter, render grid, detail modal ===== */
App.listings = {
  getFiltered() {
    const { search, category, type, sort, favOnly } = App.state.filters;
    const q = search.trim().toLowerCase();
    let list = App.state.items.filter(i =>
      (!q || (i.title + " " + i.desc).toLowerCase().includes(q)) &&
      (category === "all" || i.category === category) &&
      (type === "all" || i.type === type) &&
      (!favOnly || App.state.favorites.includes(i.id))
    );
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  },

  cardHTML(i) {
    const e = App.ui.esc, fav = App.state.favorites.includes(i.id);
    const label = { sell: "For sale", swap: "Swap", free: "Free" }[i.type];
    return `<article class="card" data-id="${i.id}" data-reveal="up">
      <span class="badge">${label}</span>
      ${i.ownerId === App.state.ownerId ? `<span class="owner-badge">Your listing</span>` : ""}
      <button class="fav ${fav ? "on" : ""}" data-fav="${i.id}" aria-label="Save listing">♥</button>
      <div class="card-img">${i.image ? `<img src="${e(i.image)}" alt="${e(i.title)}" loading="lazy">` : `<span aria-hidden="true">${i.emoji || "📦"}</span>`}</div>
      <div class="card-body">
        <div class="card-title">${e(i.title)}</div>
        <div class="card-meta">${e(i.category)} · ${e(i.condition)}</div>
        <div class="price">${App.ui.price(i)}</div>
      </div>
    </article>`;
  },

  render() {
    const list = this.getFiltered();
    document.getElementById("grid").innerHTML =
      list.length ? list.map(i => this.cardHTML(i)).join("") : `<p class="empty">No items found. Try another filter!</p>`;
    document.getElementById("resultCount").textContent = `${list.length} item(s) found`;
    App.ui.observeReveals?.(document.getElementById("grid"));
  },

  openDetail(id) {
    const i = App.state.items.find(x => x.id === id);
    if (!i) return;
    const e = App.ui.esc;
    document.getElementById("detailBody").innerHTML = `
      ${i.image ? `<img class="detail-image" src="${e(i.image)}" alt="${e(i.title)}">` : `<div class="detail-emoji">${i.emoji || "📦"}</div>`}
      <h2>${e(i.title)}</h2>
      <p class="card-meta">${e(i.category)} · ${e(i.condition)} · Posted by ${e(i.seller)}${i.ownerId === App.state.ownerId ? " · Your listing" : ""}</p>
      <p class="price">${App.ui.price(i)}</p>
      <p style="margin-top:.6rem">${e(i.desc) || "No description."}</p>
      <button class="btn btn-maroon" id="contactBtn" style="margin-top:1rem">Contact seller</button>
      <div id="contactBox" class="contact-box" hidden>📞 ${e(i.contact)}</div>`;
    document.getElementById("contactBtn").onclick = () => {
      document.getElementById("contactBox").hidden = false;
    };
    if (i.ownerId === App.state.ownerId) {
      document.getElementById("detailBody").insertAdjacentHTML("beforeend", `<button class="btn btn-delete" id="deleteListingBtn" type="button">Delete your listing</button>`);
      document.getElementById("deleteListingBtn").onclick = () => {
        if (!window.confirm(`Are you sure you want to delete “${i.title}”?`)) return;
        if (!App.state.removeItem(i.id)) {
          App.ui.toast("You can only delete listings you posted.");
          return;
        }
        App.ui.closeModals();
        this.render();
        App.ui.toast("Listing deleted.");
      };
    }
    App.ui.openModal("detailModal");
  },

  bindEvents() {
    document.getElementById("grid").addEventListener("click", ev => {
      const favBtn = ev.target.closest("[data-fav]");
      if (favBtn) {
        App.state.toggleFav(Number(favBtn.dataset.fav));
        this.render();
        return;
      }
      const card = ev.target.closest(".card");
      if (card) this.openDetail(Number(card.dataset.id));
    });
  }
};
