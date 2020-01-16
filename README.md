# devmentors

Curso Dev.Mentors Neomind

npm i -g es-dev-server
es-dev-server -w

# Web Components

- O que são web components
  - Sao independente
  -
- Custom Elements
- Shadow DOM
- ES Modules
- Template HTML
- Como usar um componente da web
- Como definir um novo elemento HTML.

helpers :

https://showmethecode.com.br/async-await/

npm -> Node pack manager

polymer-project.org

Setup projeto (Lit Element - Google - Classes para criar elementos)

npm i -g yarn
yarn init
yarn add lit-element
yarn add -D es-dev-server

yarn start

gitignore
node_modules/

desafio-3

<!DOCTYPE html>
<html>
<head>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333333;
}

li {
float: left;
}

li a {
display: block;
color: white;
text-align: center;
padding: 16px;
text-decoration: none;
}

li a:hover {
background-color: #111111;
}
</style>

</head>
<body>

<ul>
  <li><a href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li><a href="#contact">Contact</a></li>
  <li><a href="#about">About</a></li>
</ul>

</body>
</html>

 <div class="topnav" id="topmenu">
                <a id="title" class="active">${this.title}</a>
            </div>`;
