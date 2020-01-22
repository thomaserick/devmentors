class ApigService {
  baseUrl = "http://172.17.1.34:8080";

  getRecents() {
    return new Promise(async resolve => {
      const response = await fetch(`${this.apiURL}/article/recent`);
      const recents = await response.json();

      resolve(recents);
    });
  }

  getArticleById(id) {
    return new Promise(async resolve => {
      const response = await fetch(`${this.apiURL}/article/${id}`);
      const article = await response.json();

      resolve(article);
    });
  }

  getComments(id) {
    return new Promise(async resolve => {
      const response = await fetch(`${this.apiURL}/social/comments/${id}`);
      const article = await response.json();

      resolve(article);
    });
  }
}

export default new BlogService();
