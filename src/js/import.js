json = new Array();
basket = new Array();
filters = new Array();
searchedElements = new Array();
filteredElements = new Array();
filteredOneList = new Array();
filteredjson = new Array(); //quand filtres selectionnées, on stock les formations correspondante ici. Utile pour la searchbar
fetch("data/Final_V32.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((formation) => {
      json.push(formation);
    });
    displayAll();
  });
formation_add = document.getElementsByClassName("listePrincipale");
for (i = 0; i < formation_add.length; i++) {
  currentformation.addEventListener("click", addPanier);
}

function addFilters(ev) {
  filters["duree de la formation"] = [];
  let buttonsChecked = document.querySelectorAll(
    "input[name=boxDuree]:checked"
  );
  //filters["duree de la formation"]
  if (buttonsChecked.length > 0) {
    //at least 1 button is clicked
    for (i = 0; i < buttonsChecked.length; i++) {
      filters["duree de la formation"].push(buttonsChecked[i].value);
    }
    for (f in filters["duree de la formation"]) {
      search("duree de la formation", filters["duree de la formation"][f]);
    }
  } else {
    search();
  }
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

function oneElementToString(formation) {
  var loc = "";
  var nom = "";
  var intit = "";
  var duree = "";
  var type = "";
  var modal = "";
  if (formation.hasOwnProperty("intitulé")) {
    intit = formation["intitulé"] + "- ";
  }
  if (formation.hasOwnProperty("localisation")) {
    loc = formation["localisation"] + "- ";
  }
  if (formation.hasOwnProperty("Type d'organisme")) {
    type = formation["Type d'organisme"] + "- ";
  }
  if (formation.hasOwnProperty("modalites acces")) {
    modal = formation["modalites acces"] + "- ";
  }
  if (formation.hasOwnProperty("nom")) {
    loc = formation["nom"] + "- ";
  }
  if (formation.hasOwnProperty("duree de la formation")) {
    duree = formation["duree de la formation"];
  }
  return ["-"] + intit + nom + type + loc + modal + duree;
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
    var loc = "";
    var nom = "";
    var intit = "";
    var duree = "";
    var type = "";
    var modal = "";
    if (formation.hasOwnProperty("intitulé")) {
      intit = formation["intitulé"] + "- ";
    }
    if (formation.hasOwnProperty("localisation")) {
      loc = formation["localisation"] + "- ";
    }
    if (formation.hasOwnProperty("Type d'organisme")) {
      type = formation["Type d'organisme"] + "- ";
    }
    if (formation.hasOwnProperty("modalites acces")) {
      modal = formation["modalites acces"] + "- ";
    }
    if (formation.hasOwnProperty("nom")) {
      loc = formation["nom"] + "- ";
    }
    if (formation.hasOwnProperty("duree de la formation")) {
      duree = formation["duree de la formation"];
    }
    table_output.classList.add("listePrincipale");
    table_output.appendChild(
      document.createTextNode(["-"] + intit + nom + type + loc + modal + duree)
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

/*
function search(catFiltre, valeurFiltre) {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.querySelector("#data");
  x.innerHTML = "";
  let found = false;
  searchedElements = [];
  results = new Array();
  for (i = 0; i < json.length; i++) {
    let obj = json[i];
    for (categorie in obj) {
      if (
        typeof obj[categorie] !== "undefined" &&
        typeof obj[categorie] == "string"
      ) {
        if (obj[categorie].toLowerCase().includes(input)) {
          elem = document.createElement("li");
          elem.classList.add(obj["duree de la formation"]);

          var loc = "";
          var nom = "";
          var intit = "";
          var duree = "";
          var type = "";
          var modal = "";
          if (obj.hasOwnProperty("intitulé")) {
            intit = obj["intitulé"] + "- ";
          }
          if (obj.hasOwnProperty("localisation")) {
            loc = obj["localisation"] + "- ";
          }
          if (obj.hasOwnProperty("Type d'organisme")) {
            type = obj["Type d'organisme"] + "- ";
          }
          if (obj.hasOwnProperty("modalites acces")) {
            modal = obj["modalites acces"] + "- ";
          }
          if (obj.hasOwnProperty("nom")) {
            loc = obj["nom"] + "- ";
          }
          if (obj.hasOwnProperty("duree de la formation")) {
            duree = obj["duree de la formation"];
          }
          elem.innerHTML = ["-"] + intit + nom + type + loc + modal + duree;
          searchedElements.push(elem);
          //x.appendChild(elem);
          found = true;
          break;
        }
      }
    }
  }

  //filteredElements = searchedElements;
    //x.innerHTML = "";
    found = false;
    for (el in searchedElements) {
        for (filter in filters) {
          for (i = 0; i < filters[filter].length;i++) {//remplacer par boucle i
          //console.log(values);
          console.log("el: "+el+ ", filter: "+filter+", value: "+i+" "+ filters[filter][i]+", "+filters[filter].length);
          if (
            searchedElements[el].classList.contains(filters[filter][i])
          ) {
            filteredElements.push(searchedElements[el]);
            found = true;
          } 
        }
      }
    }
  
  searchedElements.forEach((result) => {
    x.appendChild(result);
  });

  if (!found) {
    x.appendChild(
      document.createTextNode("Aucun élement ne correspond à votre recherche")
    );
  }
}*/

function searchOneFilter(cat, value) {
  filteredOneList = [];
  console.log(filteredOneList);
  for (i = 0; i < json.length; i++) {
    let obj = json[i];
    if (cat != "all") {
      if (typeof obj[cat] !== "undefined" && obj[cat] == value) {
        elem = document.createElement("li");
        //console.log(elem);
        //console.log(categorie);
        elem.appendChild(document.createTextNode(oneElementToString(obj)));

        filteredOneList.push(elem); //filteredOneList is array of li
      }
    } else {
      for (categorie in obj) {
        if (
          typeof obj[categorie] !== "undefined" &&
          typeof obj[categorie] == "string" &&
          categorie != "URL"
        ) {
          if (obj[categorie].toLowerCase().includes(value)) {
            elem = document.createElement("li");
            //console.log(elem);
            //console.log(categorie);
            elem.appendChild(document.createTextNode(oneElementToString(obj)));

            filteredOneList.push(elem); //filteredOneList is array of li
            //console.log(elem);
          }
        }
      }
    }
  }

  return filteredOneList;
}

function searchAll() {
  let inputSearch = document.getElementById("searchbar").value;
  let x = document.querySelector("#data");
  let buttonsChecked = document.querySelectorAll(
    "input:checked"
  );
  if (buttonsChecked.length == '0') {
    x.innerHTML = "";
   displayAll();
}
else{
  x.innerHTML = "";
  filteredElements["duree de la formation"] = [];
  for (k = 0; k < buttonsChecked.length; k++){
    console.log(buttonsChecked[k].name);
    //filteredElements[buttonsChecked[i].name]//arraylist with the categorie as key, each key will have a list of results with the filter
    filteredElements[buttonsChecked[k].name].push(searchOneFilter(buttonsChecked[k].name, buttonsChecked[k].value));
    //console.log(filteredElements);
    result = filteredElements.flat(1);
    //console.log(searchOneFilter(buttonsChecked[k].name, buttonsChecked[k].value));
    
  }
  for (catFilt in filteredElements) {
    for (p = 0; p < filteredElements[catFilt].length;p++/*elemFiltered in catFilt*/) {
      for (elementFilt in filteredElements[catFilt][p]) {
        console.log(filteredElements[catFilt][p][elementFilt]);
      x.appendChild(filteredElements[catFilt][p][elementFilt]);
      }
      
    }
    //console.log(filteredElements[catFilt]);
    }
  }
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
