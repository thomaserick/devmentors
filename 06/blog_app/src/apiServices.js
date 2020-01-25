class ApiService {
  //baseUrl = "http://172.17.1.38:8080";
  baseUrl = "http://192.168.0.17:8080";

  //Obter artigos Recentes
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
        reject(err);
      }
    });
  }
  //Obter Artigo
  getArticleId(article) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}/article/${article}`, {
          mode: "cors",
          credentials: "include",
          method: "GET"
        });
        const data = await response.json();
        resolve(data);
      } catch (err) {
        console.error("error", err.message);
        reject(err);
      }
    });
  }

  //ObterComentarios
  getComments(article) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${this.baseUrl}/social/comments/${article}`,
          {
            mode: "cors",
            credentials: "include",
            method: "GET"
          }
        );
        const data = await response.json();
        resolve(data);
      } catch (err) {
        console.error("error", err.message);
        reject(err);
      }
    });
  }

  //New comments
  addComments(comments) {
    return new Promise(async resolve => {
      try {
        const response = await fetch(` ${this.baseUrl}/social/comment`, {
          mode: "cors",
          credentials: "include",
          method: "POST",
          body: JSON.stringify(comments),
          headers: new Headers({
            "content-type": "application/json"
          })
        });
        resolve(response);
      } catch (err) {
        console.error("error" + err.message);
      }
    });
  }

  //Obter usuário Atual
  getCurrentUser() {
    return new Promise(async resolve => {
      try {
        const response = await fetch(`${this.baseUrl}/security/user/`, {
          mode: "cors",
          credentials: "include",
          method: "GET"
        });

        if (response.ok) {
          const data = await response.json();
          resolve(data);
        }
      } catch (err) {
        console.error("error", err.message);
      }
    });
  }

  //Realizar Login
  postLogin(user) {
    return new Promise(async resolve => {
      try {
        const response = await fetch(` ${this.baseUrl}/security/login`, {
          mode: "cors",
          credentials: "include",
          method: "POST",
          body: JSON.stringify(user),
          headers: new Headers({
            "content-type": "application/json"
          })
        });
        resolve(response);
      } catch (err) {
        console.error("error" + err.message);
      }
    });
  }

  //Realizar Cadastro de novo usúario
  postNewUser(user) {
    return new Promise(async resolve => {
      try {
        const response = await fetch(` ${this.baseUrl}/security/user`, {
          mode: "cors",
          credentials: "include",
          method: "POST",
          body: JSON.stringify(user),
          headers: new Headers({
            "content-type": "application/json"
          })
        });

        resolve(response);
      } catch (err) {
        console.log("error" + err.message);
      }
    });
  }

  //Logout
  logout() {
    return new Promise(async resolve => {
      try {
        const response = await fetch(`${this.baseUrl}/security/logout`, {
          mode: "cors",
          credentials: "include",
          method: "GET"
        });
        resolve(response);
      } catch (err) {
        console.error("error" + err.message);
      }
    });
  }

  addPost(post) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${this.baseUrl}/article`, {
          mode: "cors",
          credentials: "include",
          method: "POST",
          body: JSON.stringify(post),
          headers: new Headers({
            "content-type": "application/json"
          })
        });
        resolve(response);
      } catch (err) {
        console.log("error" + err.message);
        reject(err);
      }
    });
  }
}

export default new ApiService();
