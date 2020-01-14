const fetch = require("node-fetch");

async function getJson() {
  try {
    const response = await fetch("http://172.17.1.15:8080/article/recent");
    const data = await response.json();
  } catch (err) {
    alert(err);
  }

  return data;
}
