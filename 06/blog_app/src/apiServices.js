class ApiService {
  baseUrl = "http://172.17.1.38:8080";
  //baseUrl = "http://192.168.0.17:8080";

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
        const response = await fetch(
          `${this.baseUrl}/article/recent/${article}`,
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

  //Obter usuário
  getUserId({ email }) {
    return new Promise(async resolve => {
      try {
        const response = await fetch(`${this.baseUrl}/security/user/${email}`, {
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
        console.log(response);
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
        console.log(response);
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
        reject(err);
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
