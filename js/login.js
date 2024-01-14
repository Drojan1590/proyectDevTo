// Login

/*let token = localStorage.getItem("token");
  token ? window.open("views/main.html", "_self") : window.open("main.html", "_self");*/

const login = () => {
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (username && password) {
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ";
  
      localStorage.setItem("token", token);
      location.reload();
    }
  };
  
  let loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", login);