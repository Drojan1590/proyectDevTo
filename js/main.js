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
    /*let imagen = imagenField.value
    let titulo = tituloField.value
    let contenido = contenidoField.value

    let post = { fechaFormateada, nombre, avatar, imagen, titulo, contenido,tags}
    let result = await savePost(post);
    console.log(result);*/
    imagenField.value = " ";
    tituloField.value = " ";
    currentContent.value = " ";
    contenidoField.innerText = " ";
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