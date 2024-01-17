// array que almacena los objetos
let postEntries = [];
// funcion para obtener el objeto de la base de datos
const getAllPost = async () => {
  let response = await fetch(
    "https://mi-proyecto-1-388513-default-rtdb.firebaseio.com/posts/.json"
  );
  let data = await response.json();
  let transformedData = Object.entries(data).reduce((accum, current) => {
    return [...accum, { key: current[0], ...current[1] }];
  }, []);
  postEntries = transformedData;

  printCardPost(postEntries);
};
// funcion para crear una card del post
const createPostCard = (postData) => {
  let { fechaFormateada, nombre, avatar, imagen, titulo, tags, key } = postData;

  let cardPost = document.createElement("div");

  cardPost.addEventListener("click", () => {
    window.open(`views/detail.html?entryKey=${key}`, "_blank");
  });

  let imagenPost = document.createElement("img");
  imagenPost.classList.add("fullWidth");
  imagenPost.src = imagen;
  imagenPost.alt = "imagen del post";

  let divAuthor = document.createElement("div");
  divAuthor.classList.add("juniorDevSectionPadding");

  let asideAuthor = document.createElement("aside");

  let divProfile = document.createElement("div");
  divProfile.classList.add("profileInfo");

  let imgAvatar = document.createElement("img");
  imgAvatar.classList.add("profileImage");
  imgAvatar.src = avatar;
  imgAvatar.alt = "profile picture of a guy smiling";

  let divName = document.createElement("div");
  divName.classList.add("column");

  let nameAuthor = document.createElement("h3");
  nameAuthor.classList.add("profileName");
  nameAuthor.innerText = nombre;

  let fechaPost = document.createElement("h4");
  fechaPost.classList.add("profile-subtitle");
  fechaPost.innerText = fechaFormateada;

  let divContent = document.createElement("div");
  divContent.classList.add("paddingOnDesktop");

  let titlePost = document.createElement("h1");
  titlePost.classList.add("mainTitle");
  titlePost.innerText = titulo;

  let asideTag = document.createElement("div");
  asideTag.classList.add("d-flex", "gap-3", "flex-wrap");
  tags.forEach((tag) => {
    asideTag.innerHTML =
      asideTag.innerHTML +
      `
    <span class="badge text-bg-info">${tag}</span>
    `;
  });

  let divEmoji = document.createElement("div");
  divEmoji.classList.add("emoji-section");

  let emoji = document.createElement("div");
  emoji.classList.add("setOfEmojis");

  let emoji1 = document.createElement("p");
  emoji1.textContent = "❤️​";

  let emoji2 = document.createElement("p");
  emoji2.innerText = "🦄​";

  let emoji3 = document.createElement("p");
  emoji3.innerText = "🤯​";

  let emoji4 = document.createElement("p");
  emoji4.innerText = "🔥​";

  let emojiTextCantidad = document.createElement("p");
  emojiTextCantidad.classList.add("emojiText");
  emojiTextCantidad.style.marginLeft = "10px";
  emojiTextCantidad.innerText = "🗨️​" + " " + "93";

  let emojiTextComments = document.createElement("p");
  emojiTextComments.classList.add("emojiText", "showOnTabletOnly");
  emojiTextComments.style.marginLeft = "10px";
  emojiTextComments.innerText = "comments";

  let divBookmark = document.createElement("div");
  divBookmark.classList.add("bookmarkSection");
  divBookmark.innerText = "4 min read";

  let imgBookmark = document.createElement("img");
  imgBookmark.src = "../img/bookmark.png";
  imgBookmark.alt = "bookmark icon";
  imgBookmark.style.width = "15px";
  imgBookmark.style.height = "15px";

  divBookmark.append(imgBookmark);

  emoji.append(
    emoji1,
    emoji2,
    emoji3,
    emoji4,
    emojiTextCantidad,
    emojiTextComments
  );

  divEmoji.append(emoji, divBookmark);

  //asideTag.append(tagPost,tagPost2,tagPost3,tagPost4)

  divContent.append(titlePost, asideTag, divEmoji);

  divName.append(nameAuthor, fechaPost);

  divProfile.append(imgAvatar, divName);

  asideAuthor.append(divProfile);

  divAuthor.append(asideAuthor, divContent);

  cardPost.append(imagenPost, divAuthor);

  return cardPost;
};

const printCardPost = async (postsArray) => {
  let postWrapper = document.getElementById("card-wrapper");
  postWrapper.innerHTML = " ";
  postsArray.forEach((post) => {
    let postCard = createPostCard(post);
    postWrapper.append(postCard);
  });
};

getAllPost();

let filterField = document.getElementById("filter-by-name");

filterField.addEventListener("keyup", (event) => {
  let filterAlert = document.getElementById("filter-alert");
  //filterAlert.classList.add("d-none");

  let value = event.target.value;
  let filterResult = postEntries.filter((post) =>
    post.titulo.toLowerCase().includes(value.toLowerCase())
  );
  if (!filterResult.length) {
    filterAlert.classList.remove("d-none");
  }
  printCardPost(filterResult);
});

let fechaActual = new Date();
// Nombres de los meses
let nombresMeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
// Extrae el día y el mes
let dia = fechaActual.getDate();
let mes = fechaActual.getMonth(); // Los meses comienzan desde 0
// Obtiene el nombre del mes
let nombreMes = nombresMeses[mes];
// Formatea la fecha como cadena (DD de Mes)
let fechaHoy = (dia < 10 ? "0" + dia : dia) + " de " + nombreMes;

let latestField = document.getElementById("filter-by-fecha");
latestField.addEventListener("click", () => {
  let filterResult = postEntries.filter((post) => {
    return post.fechaFormateada === fechaHoy
    })
    printCardPost(filterResult)
  })

let relevantField = document.getElementById("filter-relevant");
relevantField.addEventListener("click", () => {
  let filterResult = postEntries.filter((post) => {
    return post.relevant == true
  })
  printCardPost(filterResult)
})

let topField = document.getElementById("filter-top");
topField.addEventListener("click", () => {
  let filterResult = postEntries.filter((post) => {
    return post.rating > 90;
  })
  printCardPost(filterResult)
})