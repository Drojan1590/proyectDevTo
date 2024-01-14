/* Funcion para agregar los item al input*/
let tags = [];
// funcion para agregar los items y permitir que solo sean 4 
  function actualizarTextArea() {
    // Obtener el valor seleccionado del ComboBox
    let comboBox = document.getElementById("comboBox");
    let selectedValue = comboBox.options[comboBox.selectedIndex].value;

    // Si el valor seleccionado es una cadena vacía o ya está en la lista, no hagas nada
    if (selectedValue === "" || tags.includes(selectedValue)) {
      return;
    }

    // Obtener el contenido actual del TextArea
    let resultadoTextArea = document.getElementById("resultado");
    let currentContent = resultadoTextArea.value;

    // Verificar si ya hay 4 elementos en el TextArea
    let elements = currentContent.trim().split(', ');
    if (elements.length >= 4) {
      alert("¡Solo puedes agregar 4 elementos!");
      return;
    }

    // Actualizar la lista de elementos seleccionados
    tags.push(selectedValue);

    // Concatenar el nuevo elemento al contenido existente con una coma y espacio
    if (currentContent.trim() !== "") {
      resultadoTextArea.value = currentContent + ', ' + selectedValue;
    } else {
      resultadoTextArea.value = selectedValue;
    }
  }
  
// Obtén la fecha actual
let fechaActual = new Date();
// Nombres de los meses
let nombresMeses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
// Extrae el día y el mes
let dia = fechaActual.getDate();
let mes = fechaActual.getMonth(); // Los meses comienzan desde 0
// Obtiene el nombre del mes
let nombreMes = nombresMeses[mes];
// Formatea la fecha como cadena (DD de Mes)
let fechaFormateada = (dia < 10 ? '0' + dia : dia) + ' de ' + nombreMes;
// se crea un objet harcodeado del autor y su avatar
let nombre = "Alejandro Sanchez"
let avatar = "https://randomuser.me/api/portraits/men/60.jpg"


// Se crean variables y se le asigna el elemento de HTML
let imagenField = document.getElementById("imagen")
let tituloField = document.getElementById("titulo")
let contenidoField = document.getElementById("contenido")
let btnPublish = document.getElementById("subir-post")
// Se crea una funcion que extraiga los valores y los convierta en un objeto
btnPublish.addEventListener("click", async() => {
    let imagen = imagenField.value
    let titulo = tituloField.value
    let contenido = contenidoField.value

    let post = { fechaFormateada, nombre, avatar, imagen, titulo, contenido,tags}
    let result = await savePost(post);
    console.log(result);

}) 

// funcion para guardar el post en la base de datos
const savePost = async (post) => {
    let response = await fetch(
        "https://mi-proyecto-1-388513-default-rtdb.firebaseio.com/posts/.json",
        {
            method: "POST",
            body: JSON.stringify(post),
        }
    );
    let data = await response
    return data
}

// array que almacena los objetos
let postEntries = []
// funcion para obtener el objeto de la base de datos
const getAllPost = async () => {
  let response = await fetch(
    "https://mi-proyecto-1-388513-default-rtdb.firebaseio.com/posts/.json"
  )
  let data = await response.json();
  let transformedData = Object.entries(data).reduce((accum, current) => {
    return [...accum, { key: current[0], ...current[1] }];
  }, []);
  postEntries = transformedData;
  
  printCardPost(postEntries)
  
}
// funcion para crear una card del post
const createPostCard = (postData) => {
  let {fechaFormateada, nombre, avatar, imagen, titulo, tags} = postData;

  let cardPost = document.createElement("div")

  let imagenPost = document.createElement("img")
  imagenPost.classList.add("fullWidth")
  imagenPost.src = imagen
  imagenPost.alt = "imagen del post"

  let divAuthor = document.createElement("div")
  divAuthor.classList.add("juniorDevSectionPadding")

  let asideAuthor = document.createElement("aside")

  let divProfile = document.createElement("div")
  divProfile.classList.add("profileInfo")

  let imgAvatar = document.createElement("img")
  imgAvatar.classList.add("profileImage")
  imgAvatar.src = avatar
  imgAvatar.alt = "profile picture of a guy smiling"

  let divName = document.createElement("div")
  divName.classList.add("column")

  let nameAuthor = document.createElement("h3")
  nameAuthor.classList.add("profileName")
  nameAuthor.innerText = nombre

  let fechaPost = document.createElement("h4")
  fechaPost.classList.add("profile-subtitle")
  fechaPost.innerText = fechaFormateada

  let divContent = document.createElement("div")
  divContent.classList.add("paddingOnDesktop")

  let titlePost = document.createElement("h1")
  titlePost.classList.add("mainTitle")
  titlePost.innerText = titulo

  let asideTag = document.createElement("div")
  asideTag.classList.add("d-flex", "gap-3", "flex-wrap")
  tags.forEach((tag) => {
    asideTag.innerHTML =
    asideTag.innerHTML +
      `
    <span class="badge text-bg-info">${tag}</span>
    `;
  });
  
/*
  let divEmoji = document.createElement("div")
  divEmoji.classList.add("emoji-section")

  let emoji = document.createElement("div")
  emoji.classList.add("setOfEmojis")

  let emoji1 = document.createElement("p")
  emoji1.innerText = "&#128151";

  let emoji2 = document.createElement("p")
  emoji2.innerText = "&#129321";
  
  let emoji3 = document.createElement("p")
  emoji3.innerText = "&#129330";

  let emoji4 = document.createElement("p")
  emoji4.innerText= "&#128293";

  let emojiTextCantidad = document.createElement("p")
  emojiTextCantidad.classList.add("emojiText")
  emojiTextCantidad.style.marginLeft= "10px";
  emojiTextCantidad.innerText = "&#128172" + "93"

  let emojiTextComments = document.createElement("p")
  emojiTextComments.classList.add("emojiText", "showOnTabletOnly")
  emojiTextComments.style.marginLeft = "10px"
  emojiTextComments.innerText = "comments"

  let divBookmark =  document.createElement("div")
  divBookmark.classList.add("bookmarkSection")
  divBookmark.innerText = "4 min read"

  let imgBookmark = document.createElement("img")
  imgBookmark.src = "../img/bookmark.png"
  imgBookmark.alt = "bookmark icon"
  imgBookmark.style.width = "15px"
  imgBookmark.style.height = "15px"

  divBookmark.append(imgBookmark)
  */

  //emoji.append(emoji1, emoji2, emoji3, emoji4, emojiTextCantidad, emojiTextComments)

  //divEmoji.append(emoji, divBookmark)

  //asideTag.append(tagPost,tagPost2,tagPost3,tagPost4)

  divContent.append(titlePost, asideTag/*, divEmoji*/)

  divName.append(nameAuthor, fechaPost)

  divProfile.append(imgAvatar, divName)

  asideAuthor.append(divProfile)

  divAuthor.append(asideAuthor,divContent)

  cardPost.append(imagenPost, divAuthor)

  //return cardPost
  console.log(cardPost)
}

const printCardPost = async(postsArray) => {
  let postWrapper = document.getElementById("card-wrapper")
  postWrapper.innerHTML = " ";
  postsArray.forEach((post) => {
    let postCard = createPostCard(post)
    postWrapper.append(postCard)
  })
}


getAllPost();

