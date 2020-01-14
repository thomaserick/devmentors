import { makePost } from "./makepost.js";

async function getJson() {
  try {
    const response = await fetch("http://172.17.1.15:8080/article/recent");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      makePost(data[i].title, data[i].content);
    }
  } catch (error) {
    console.error(error);
  }
}

getJson();
