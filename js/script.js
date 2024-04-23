/**
 * Uno Spotify EPICO!
 * Compito di fine settimana
 * data 18.04.2024
 */


//console.log("It's working...");

/**
 * Inizializzo le costanti globali
 */

// Inizializzo la variabile url dell'api della lista di canzoni presenti nel server
const url = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
// Inizializzo è assegno alla variabile found l'elemento id del document html
const found = document.getElementById("found");
// Inizializzo la variabile viewMusic di ogni artista già presente nel document html
const viewMusic = document.querySelectorAll(".viewMusic");
// Inizializzo la variabile searchField della casella di input nel document html
const searchField = document.getElementById("searchField");
// Inizializzo la variabile del pulsante clear nel document html
const searchClear = document.querySelector(".search-clear");



/**
 * Funzione ricerca per artista e ricerca per artista già presente nel document html
 */

function search(idArtista = "") {
  // Verifica se l'artista già presente non ha un campo vuoto
  if (idArtista != "") {
    searchArtist = idArtista;
  } else {
    // altrimenti richiama il valore inserito nella casella di input di ricerca
    searchArtist = searchField.value;
    console.log(searchArtist);
  }

  if (searchArtist) {
    // se è preseente un artista prima di effettuara la fetch fai una pulizia del document html
    clearSearch();
    fetch(url + `${searchArtist}`)
    .then(response => {
      // Verifichiamo se la risposta è un 200
      if(!response.ok) {
        throw new Error("Errore nella richiesta API ai brani musicali...");
      }
      return response.json();
    })
    .then(elencoDati => {
      let listaCanzoni = elencoDati.data;
      // Richiama funzione per la visualizzazione della ricerca e del contenuto già presente nel document html
      elencoCanzoni(listaCanzoni, idArtista);
    })
    .catch(error => {
      console.error("Errore nella chiamata all'end-point: ", error);
    })
  }
};


/**
 * Funzione visualizza elenco canzoni nel document html
 */

function elencoCanzoni(listaCanzoni, idArtista = "") {
  let inContent = "";
  // Se l'id dell'artista è presente richiama l'id e la classe corrispondente
  if (idArtista != "") {
    let artistaView = document.getElementById(`${idArtista}`);
    let section = document.getElementById(idArtista + "Section");
    artistaView.classList.remove("d-none");
    artistaView.classList.add("d-block");
    inContent = section;
  } else {
    // Altrimenti richiama la sezione ricerca nel document html
    let searchSection = document.getElementById("searchSection");
    found.classList.remove("d-none");
    found.classList.add("d-block");
    inContent = searchSection;
  }
  
  // Esegui un ciclo in funzione dei brani presenti
  listaCanzoni.forEach(brano => {
    // Crea un elemento div con classe card da inserire nel document html
    let content = document.createElement("div");
    content.classList.add("card");
    content.innerHTML =` 
      <img src="${brano.album.cover}" class="card-img-top" alt="${brano.title_short}">
      <div class="card-body">
        <h5 class="card-title">${brano.title_short}</h5>
        <p class="card-text">${brano.dutation}</p>
      </div>
      `
    inContent.append(content);
  });
};


/**
 * Funzione pulisci ricerca 
 */

function clearSearch() {
  viewMusic.forEach(artista => {
    let artist = document.getElementById(artista.id);
    artist.classList.remove("d-block");
    artist.classList.add("d-none");
  });
  found.classList.remove("d-block");
  found.classList.add("d-none");
  let content = document.querySelectorAll(".card");
  content.forEach(card => {
    card.remove();
  });
  document.getElementById("searchField").value = "";
};


/**
 * Si attiva nel momento in cui si apre il document html
 */

document.addEventListener("DOMContentLoaded", ()=> {
  viewMusic.forEach(artista => {
    search(artista.id);
  });
  search(idArtista = "");
});