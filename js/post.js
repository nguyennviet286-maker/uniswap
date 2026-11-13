/* ===== POST FORM (Member D): create a new listing ===== */
App.post = {
  emojiByCategory: { "Books": "📚", "Electronics": "🔌", "Clothes": "👕", "Furniture": "🪑", "Dorm essentials": "🛏️", "Other": "📦" },

  bindEvents() {
    const form = document.getElementById("postForm");
    const type = document.getElementById("postType");
    const priceWrap = document.getElementById("priceWrap");
    const photoInput = document.getElementById("postPhoto");
    const preview = document.getElementById("photoPreview");
    let photoData = "";

    photoInput.addEventListener("change", () => {
      const file = photoInput.files[0];
      photoData = "";
      preview.hidden = true;
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        photoInput.value = "";
        App.ui.toast("Please choose an image file.");
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        photoInput.value = "";
        App.ui.toast("Photo must be 8 MB or smaller.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const source = new Image();
        source.onload = () => {
          const scale = Math.min(1, 1200 / Math.max(source.width, source.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(source.width * scale);
          canvas.height = Math.round(source.height * scale);
          canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
          photoData = canvas.toDataURL("image/jpeg", 0.82);
          preview.src = photoData;
          preview.hidden = false;
        };
        source.onerror = () => App.ui.toast("Could not read this image.");
        source.src = reader.result;
      };
      reader.onerror = () => App.ui.toast("Could not read this image.");
      reader.readAsDataURL(file);
    });

    // Hide the price field for swap/free listings
    type.addEventListener("change", () => priceWrap.hidden = type.value !== "sell");

    form.addEventListener("submit", ev => {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      if (photoInput.files.length && !photoData) {
        ev.preventDefault();
        App.ui.toast("Wait for the photo preview to finish loading.");
        return;
      }
      App.state.addItem({
        title: d.title.trim(),
        category: d.category,
        type: d.type,
        price: d.type === "sell" ? Number(d.price) || 0 : 0,
        condition: d.condition,
        image: photoData || "",
        emoji: this.emojiByCategory[d.category] || "📦",
        desc: d.desc.trim(),
        seller: d.seller.trim(),
        contact: d.contact.trim()
      });
      form.reset();
      photoData = "";
      preview.removeAttribute("src");
      preview.hidden = true;
      priceWrap.hidden = false;
      App.ui.closeModals();
      App.listings.render();
      App.ui.toast("Your item is now listed!");
    });
  }
};
