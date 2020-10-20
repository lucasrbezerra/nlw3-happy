// get values from html
var lat;
lat = document.querySelector("span[data-lat]").dataset.lat;
var lng;
lng = document.querySelector("span[data-lng]").dataset.lng;

// create map
var map;
map = L.map("mapid").setView([lat, lng], 15);

//Create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

// marcar no map o icon existente
let marker;

marker = L.marker([lat, lng], { icon }).addTo(map);

// create and add new marker
map.on("click", (event) => {
  marker && map.removeLayer(marker);

  lat = event.latlng.lat;
  lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat; /* Seleciona do html*/
  document.querySelector("[name=lng]").value = lng;

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// Adicionar o campo de fotos
function addPhotoField() {
  //  pegar o container de todos #images
  const container = document.querySelector("#images");
  //  pegar o container para duplicar .new-image
  const fieldsContainer = document.querySelectorAll(".new-upload");
  //  realizar o clone da última imagem adicionada
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  // verificar se o campo está vazio, se sim, não adicionar ao container de images
  const input = newFieldContainer.children[0];

  if (input.value == "") {
    return;
  }

  // limpar o campo antes de adicionar ao container de imagens
  input.value = "";

  //  adicionar o clone ao container de #images
  container.appendChild(newFieldContainer);
}
// deletar fotos
function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length < 2) {
    //  limpar o valor do campo
    span.parentNode.children[0].value = "";
    return;
  }

  //  deletar o campo
  span.parentNode.remove();
}
// select yes or not
function toggleSelect(event) {
  //  retirar a class .active (dos dois botões)
  document.querySelectorAll(".button-select button").forEach((button) => {
    button.classList.remove("active");
  });
  //  colocar a class .active nesse botão clicado
  const button = event.currentTarget;
  button.classList.add("active");

  //  atualizar o meu input hidden com o valor selecionado
  const input = document.querySelector('[name="open_on_weekends"]');

  // verificar se sim ou não
  input.value = button.dataset.value;
}
// validar campos lng e lat
function validate(event) {
  //validar se lat e lng estão preenchidos
  const needsLetAndLng = document.querySelectorAll('[name="lat"],[name="lng"]');
  const lat = needsLetAndLng[0].value;
  const lng = needsLetAndLng[1].value;

  console.log(lat, lng);

  if (lat == "" || lng == "") {
    event.preventDefault();
    alert("Selecione um ponto no mapa");
  }
}
