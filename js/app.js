/* ===== APP ENTRY (Member A): wires everything together ===== */
document.addEventListener("DOMContentLoaded", () => {
  App.state.load();

  // Fill category dropdowns
  const opts = App.categories.map(c => `<option>${c}</option>`).join("");
  document.getElementById("categoryFilter").innerHTML = `<option value="all">All categories</option>` + opts;
  document.getElementById("postCategory").innerHTML = opts;

  // Filter controls
  const f = App.state.filters;
  const bind = (id, key, prop = "value") =>
    document.getElementById(id).addEventListener(prop === "checked" ? "change" : "input", e => {
      f[key] = e.target[prop];
      App.listings.render();
    });
  bind("searchInput", "search");
  bind("categoryFilter", "category");
  bind("typeFilter", "type");
  bind("sortFilter", "sort");
  bind("favOnly", "favOnly", "checked");
  bind("searchInput", "search");
    // Nhấn Enter trong ô tìm kiếm: cuộn xuống mục sản phẩm
  document.getElementById("searchInput").addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    e.target.blur(); // ẩn bàn phím trên điện thoại
    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Modals
  document.getElementById("postBtn").onclick = () => App.ui.openModal("postModal");
  document.getElementById("heroPostBtn").onclick = () => App.ui.openModal("postModal");
  const menuToggle = document.getElementById("menuToggle");
  const siteMenu = document.getElementById("siteMenu");
  const closeMenu = () => {
    siteMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  };
  menuToggle.addEventListener("click", () => {
    siteMenu.hidden = !siteMenu.hidden;
    menuToggle.setAttribute("aria-expanded", String(!siteMenu.hidden));
  });
  siteMenu.addEventListener("click", ev => {
    if (ev.target.closest("a")) closeMenu();
  });
  document.addEventListener("click", ev => {
    if (!ev.target.closest(".menu-wrap")) closeMenu();
  });
  document.querySelectorAll(".modal").forEach(m =>
    m.addEventListener("click", e => {
      if (e.target === m || e.target.hasAttribute("data-close")) App.ui.closeModals();
    })
  );
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      App.ui.closeModals();
      closeMenu();
    }
  });

  App.listings.bindEvents();
  App.post.bindEvents();
  App.listings.render();
  App.forum.load();
  App.forum.bindEvents();
  App.forum.render();
  App.ui.initMotion();

  let storyIndex = 0;
  const storySlide = document.getElementById("storySlide");
  const storyDots = document.getElementById("storyDots");
  const renderStory = () => {
    const story = App.communityStories[storyIndex];
    storySlide.innerHTML = `<img class="story-photo" src="${App.ui.esc(story.image)}" alt="Sample product photo: ${App.ui.esc(story.item)}"><div class="story-shade"></div><div class="story-content"><span class="story-demo-label">SAMPLE COMMUNITY POST</span><div class="story-author"><img src="${App.ui.esc(story.avatar)}" alt=""><strong>${App.ui.esc(story.name)}</strong><span>· HANU student</span></div><h2>${App.ui.esc(story.item)}</h2><p>${App.ui.esc(story.text)}</p><a href="#products">View products <span aria-hidden="true">→</span></a></div>`;
    document.getElementById("storyCounter").textContent = `${storyIndex + 1} / ${App.communityStories.length}`;
    storyDots.innerHTML = App.communityStories.map((_, index) => `<button type="button" data-story="${index}" class="${index === storyIndex ? "active" : ""}" aria-label="Show post ${index + 1}" aria-current="${index === storyIndex}"></button>`).join("");
  };
  const moveStory = step => {
    storyIndex = (storyIndex + step + App.communityStories.length) % App.communityStories.length;
    renderStory();
  };
  document.getElementById("storyPrev").addEventListener("click", () => moveStory(-1));
  document.getElementById("storyNext").addEventListener("click", () => moveStory(1));
  storyDots.addEventListener("click", ev => {
    const button = ev.target.closest("[data-story]");
    if (button) { storyIndex = Number(button.dataset.story); renderStory(); }
  });
  const storyCarousel = document.querySelector(".story-carousel");
  let storyTimer = setInterval(() => moveStory(1), 6500);
  const pauseStories = () => { clearInterval(storyTimer); storyTimer = null; };
  const resumeStories = () => { if (!storyTimer) storyTimer = setInterval(() => moveStory(1), 6500); };
  storyCarousel.addEventListener("mouseenter", pauseStories);
  storyCarousel.addEventListener("mouseleave", resumeStories);
  storyCarousel.addEventListener("focusin", pauseStories);
  storyCarousel.addEventListener("focusout", ev => { if (!storyCarousel.contains(ev.relatedTarget)) resumeStories(); });
  renderStory();

  // Swipe left/right to change the story slide on phones
  let touchX = null;
  storyCarousel.addEventListener("touchstart", ev => { touchX = ev.touches[0].clientX; pauseStories(); }, { passive: true });
  storyCarousel.addEventListener("touchend", ev => {
    if (touchX !== null) {
      const dx = ev.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) moveStory(dx < 0 ? 1 : -1);
    }
    touchX = null;
    resumeStories();
  });
});
