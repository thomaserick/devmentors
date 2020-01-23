class ApiService {
  baseUrl = "http://172.17.1.34:8080";

  getArticle() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}/article/recent`, {
          mode: "cors",
          credentials: "include",
          method: "GET"
        });
        const data = await response.json();
        resolve(data);
      } catch (err) {
        console.error("error", err.message);
      }
    });
  }
}

// export async function cadArticle(article) {
//   const response = await fetch("http://localhost:8080/article", {
//     mode: "cors",
//     credentials: "include",
//     method: "POST",
//     body: JSON.stringify(article),
//     headers: new Headers({
//       "content-type": "application/json"
//     })
//   });
//   console.log(response.status);
// }

export default new ApiService();
