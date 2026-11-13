/* ===== FORUM (local demo): sample discussions with persistent likes/comments ===== */
App.forum = {
  load() {
    try {
      this.state = JSON.parse(localStorage.getItem("uniswap_forum_state")) || { likes: [], comments: {} };
    } catch (e) {
      this.state = { likes: [], comments: {} };
    }
  },

  save() {
    try { localStorage.setItem("uniswap_forum_state", JSON.stringify(this.state)); }
    catch (e) { App.ui.toast("Could not save changes on this device."); }
  },

  render() {
    const e = App.ui.esc;
    document.getElementById("forumFeed").innerHTML = App.forumSamples.map(post => {
      const comments = [...post.comments, ...(this.state.comments[post.id] || [])];
      const liked = this.state.likes.includes(post.id);
      return `<article class="forum-post" data-reveal="up">
        <div class="forum-author"><img src="${e(post.avatar)}" alt=""><div><strong>${e(post.name)}</strong><span>${e(post.time)} · Sample post</span></div></div>
        <p class="forum-post-text">${e(post.text)}</p>
        <div class="forum-actions"><button type="button" class="forum-like ${liked ? "liked" : ""}" data-like="${e(post.id)}" aria-pressed="${liked}">♥ <span>${post.likes + (liked ? 1 : 0)}</span> Like</button><span>💬 ${comments.length} comments</span></div>
        <div class="forum-comments">${comments.map(comment => `<p><strong>${e(comment.name)}</strong> ${e(comment.text)}</p>`).join("")}</div>
        <form class="comment-form" data-comment="${e(post.id)}"><input name="name" maxlength="32" placeholder="Your name" required aria-label="Your name"><input name="text" maxlength="240" placeholder="Write a comment..." required aria-label="Comment text"><button type="submit" class="btn btn-maroon">Post</button></form>
      </article>`;
    }).join("");
    App.ui.observeReveals?.(document.getElementById("forumFeed"));
  },

  bindEvents() {
    const feed = document.getElementById("forumFeed");
    feed.addEventListener("click", ev => {
      const button = ev.target.closest("[data-like]");
      if (!button) return;
      const id = button.dataset.like;
      const index = this.state.likes.indexOf(id);
      index === -1 ? this.state.likes.push(id) : this.state.likes.splice(index, 1);
      this.save();
      this.render();
    });
    feed.addEventListener("submit", ev => {
      const form = ev.target.closest("[data-comment]");
      if (!form) return;
      ev.preventDefault();
      const data = new FormData(form);
      const id = form.dataset.comment;
      (this.state.comments[id] ||= []).push({ name: String(data.get("name")).trim(), text: String(data.get("text")).trim() });
      this.save();
      this.render();
    });
  }
};
