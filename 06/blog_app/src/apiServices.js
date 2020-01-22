class ApiService {
  baseUrl = "http://172.17.1.34:8080";

  getArticle() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}/article/recent`);
        const data = await response.json();
        resolve(data);
      } catch (err) {
        console.error("error", err.message);
      }
    });
  }
}

export default new ApiService();
