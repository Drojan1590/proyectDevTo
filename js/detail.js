let postEntries = []

const BLOG_ENDPOINT = "https://mi-proyecto-1-388513-default-rtdb.firebaseio.com/posts";

let queryString = location.search;

let params = new URLSearchParams(queryString);

let entryKey = params.get("entryKey");

const getEntryById = async (entryId) => {
  let response = await fetch(`${BLOG_ENDPOINT}/${entryId}/.json`);
  let data = await response.json();
    let { fechaFormateada, nombre, imagen, avatar, titulo,contenido} = data;
    document.getElementById("entry-imagen").src = imagen;
    document.getElementById("entry-titulo").textContent = titulo;
    document.getElementById("entry-nombre").textContent = nombre;
    document.getElementById("entry-contenido").textContent = contenido;
    document.getElementById("entry-fecha").textContent = fechaFormateada;
    document.getElementById("entry-avatar").src = avatar;
};

getEntryById(entryKey);

