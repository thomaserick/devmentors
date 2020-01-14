const postsContainer = document.querySelector("#posts");

function makePost(title, content) {
  const post = '<div class="post"><div class="post-title">';
  post += title;
  post += '</div><div class="post-content">';
  post += content;
  post += "</div></div>";
  postsContainer.innerHTML += post;
}

fetch("http://172.17.1.15:8080/article/recent", { mode: "cors" })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      makePost(data[i].title, data[i].content);
    }
  })
  .catch(function(error) {
    console.error(error);
  });
