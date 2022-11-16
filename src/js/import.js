json = new Array();
basket = new Array();
test = new Array();
filteredjson = new Array(); //quand filtres selectionnées, on stock les formations correspondante ici. Utile pour la searchbar
fetch("data/Final_fini.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((formation) => {
      json.push(formation);
      displayAll();
    });
  });
formation_add = document.getElementsByClassName("listePrincipale");
for (i = 0; i < formation_add.length; i++) {
  currentformation.addEventListener("click", addPanier);
}

function addPanier(ev) {
  if (localStorage.getItem(ev.target.id) === null) {
    localStorage.setItem(ev.target.id, JSON.stringify(ev.target.id));
    basket[ev.target.id] = json[ev.target.id];
  } else {
    localStorage.removeItem(ev.target.id);
    delete basket[ev.target.id];
  }
  document.getElementById(ev.target.id).classList.toggle("BASKET");
}

function filterformation(filter) {
  var formations = document.querySelectorAll(".listePrincipale");
  formations.forEach((formation) => {
    formation.style.display = "block";

    if (!formation.classList.contains(filter)) {
      formation.style.display = "none";
    }
    if (filter == "ALL") {
      formation.style.display = "block";
    }
  });
}

function displayAll() {
  json.forEach((formation) => {
    var table_output = document.createElement("li");

    table_output.classList.add("listePrincipale");
    table_output.appendChild(
      document.createTextNode(
        ["-"] +
          formation["intitulé"] +
          "- " +
          formation["nom"] +
          ["-"] +
          formation["Type d'organisme"] +
          ["-"] +
          formation["localisation"] +
          "- " +
          formation["modalites acces"] +
          "- " +
          formation["duree de la formation"]
      )
    );
    table_output.classList.add(formation["Modalites acces"]);

    table_output.id = formation["ID"];

    if (localStorage.getItem(table_output.id) !== null) {
      table_output.classList.toggle("BASKET");
      basket[table_output.id] = json[table_output.id];
    }

    document.getElementById("data").appendChild(table_output);
  });
}

function searchOnebyOne() {
  for (i = 0; i < json.length; i++) {
    let obj = json[i];
    if (typeof obj.nom !== "undefined") {
      if (obj.nom.toLowerCase().includes(input)) {
        const elem = document.createElement("li");
        elem.innerHTML =
          ["-"] +
          obj["intitulé"] +
          "- " +
          obj["nom"] +
          ["-"] +
          obj["Type d'organisme"] +
          ["-"] +
          obj["localisation"] +
          "- " +
          obj["modalites acces"] +
          "- " +
          obj["duree de la formation"];
        x.appendChild(elem);
        found = true;
      }
    }
  }
}

function search() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.querySelector("#data");
  x.innerHTML = "";
  let found = false;

  if (!found) {
    x.appendChild(
      document.createTextNode("Aucun élement ne correspond à votre recherche")
    );
  }
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
