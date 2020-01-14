
export function makePost(title, content) {
  const post = '<div class="post"><div class="post-title">';
  post += title;
  post += '</div><div class="post-content">';
  post += content;
  post += "</div></div>";
  postsContainer.innerHTML += post;
}
