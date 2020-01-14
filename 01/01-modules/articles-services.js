export async function getArticles() {
  try {
    const response = await fetch("http://172.17.1.15:8080/article/recent");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
