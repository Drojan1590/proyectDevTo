// Login
  let loginUser = document.getElementById("login")
  loginUser.addEventListener("click", () => {
    let token = localStorage.getItem("token");
    token ? window.open("../", "_self") : window.open("login.html", "_self");
  })
  