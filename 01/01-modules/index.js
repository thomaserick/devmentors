import { makePost } from "./makepost.js";

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
