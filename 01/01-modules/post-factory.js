function makePost(title, content) {
    postsContainer.innerHTML = (
      <div class="post">
        <div class="post-title">${title}</div>
        <div class="post-content">${content};</div>
      </div>
    );
  }