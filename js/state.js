/* ===== STATE (Member B): data store + localStorage ===== */
App.state = {
  items: [],
  favorites: [],
  ownerId: "",
  filters: { search: "", category: "all", type: "all", sort: "newest", favOnly: false },

  load() {
    try {
      this.ownerId = localStorage.getItem("uniswap_owner_id");
      if (!this.ownerId) {
        this.ownerId = window.crypto?.randomUUID?.() || `owner-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        localStorage.setItem("uniswap_owner_id", this.ownerId);
      }
      this.items = JSON.parse(localStorage.getItem("uniswap_items")) || App.sampleItems.slice();
      this.items = this.items.map(item => {
        const sample = App.sampleItems.find(example => example.id === item.id);
        return sample && !item.image ? { ...item, image: sample.image } : item;
      });
      this.favorites = JSON.parse(localStorage.getItem("uniswap_favs")) || [];
    } catch (e) {
      this.ownerId = "local-session";
      this.items = App.sampleItems.slice();
      this.favorites = [];
    }
  },
  save() {
    try {
      localStorage.setItem("uniswap_items", JSON.stringify(this.items));
      localStorage.setItem("uniswap_favs", JSON.stringify(this.favorites));
    } catch (e) { /* storage unavailable */ }
  },
  addItem(item) {
    item.id = Date.now();
    item.ownerId = this.ownerId;
    this.items.unshift(item);
    this.save();
  },
  removeItem(id) {
    const item = this.items.find(entry => entry.id === id);
    if (!item || item.ownerId !== this.ownerId) return false;
    this.items = this.items.filter(item => item.id !== id);
    this.favorites = this.favorites.filter(favoriteId => favoriteId !== id);
    this.save();
    return true;
  },
  toggleFav(id) {
    const i = this.favorites.indexOf(id);
    i === -1 ? this.favorites.push(id) : this.favorites.splice(i, 1);
    this.save();
  }
};
