var postsContainer = document.querySelector("#posts");

//for (var i = 0; i <= 10; i++) {
// var post = document.createElement("div");
// post.classList.add("post");
// var postTitle = document.createElement("div");
// postTitle.classList.add("post-title");
// postTitle.innerHTML = "Post" + i;
// var postContent = document.createElement("div");
// postContent.classList.add("post-content");
// postContent.innerHTML =
//   "dehjdewuewueduieddheowcceboewpwoedewopdkewodewopdewiodewidpow";
// post.appendChild(postTitle);
// post.appendChild(postContent);
// postsContainer.appendChild(post);
// var content = '<div class="post-title">';
// content += "Post" + 1;
// content += '</div><div class="post-content">';
// content += "tiudweiudjewidjewidjewodjiwo";
// content += "</div>";
// postsContainer.innerHTML +=

function makePost(title, content) {
  var post = '<div class="post"><div class="post-title">';
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
