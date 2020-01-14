const postsContainer = document.querySelector("#posts");

function makePost(title, content) {
  postsContainer.innerHTML = (
    <div class="post">
      <div class="post-title">${title}</div>
      <div class="post-content">${content};</div>
    </div>
  );
}

async function init() {
  const articles = await getArticles();
  for (let i = 0; i < data.length; i++) {
    makePost(data[i].title, data[i].content);
  }
}
