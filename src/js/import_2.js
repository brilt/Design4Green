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
    intit = formation["intitulé"] + "   |   ";
  }
  if (formation.hasOwnProperty("localisation")) {
    loc = formation["localisation"] + "   |   ";
  }
  if (formation.hasOwnProperty("Type d'organisme")) {
    type = formation["Type d'organisme"] + "   |   ";
  }
  if (formation.hasOwnProperty("modalites acces")) {
    modal = formation["modalites acces"] + "   |   ";
  }
  if (formation.hasOwnProperty("nom")) {
    loc = formation["nom"] + "   |   ";
  }
  if (formation.hasOwnProperty("duree de la formation")) {
    duree = formation["duree de la formation"];
  }
  return intit + nom + type + loc + modal + duree;
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
      intit = formation["intitulé"] + "   |   ";
    }
    if (formation.hasOwnProperty("localisation")) {
      loc = formation["localisation"] + "   |   ";
    }
    if (formation.hasOwnProperty("Type d'organisme")) {
      type = formation["Type d'organisme"] + "   |   ";
    }
    if (formation.hasOwnProperty("modalites acces")) {
      modal = formation["modalites acces"] + "   |   ";
    }
    if (formation.hasOwnProperty("nom")) {
      loc = formation["nom"] + "   |   ";
    }
    if (formation.hasOwnProperty("duree de la formation")) {
      duree = formation["duree de la formation"] + "";
    }
    table_output.classList.add("listePrincipale");
    table_output.appendChild(
      document.createTextNode(intit + nom + type + loc + modal + duree)
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


function searchOneFilter(cat, value) {
  filteredOneList = [];
  //elem = document.createElement("li");
  for (i = 0; i < json.length; i++) {
    let obj = json[i];
    if (cat != "all") {
      if (typeof obj[cat] !== "undefined" && obj[cat] == value) {
        elem = document.createElement("li");
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
            elem.appendChild(document.createTextNode(oneElementToString(obj)));

            filteredOneList.push(elem); //filteredOneList is array of li
          }
        }
      }
    }
  }

  return filteredOneList;
}

function searchAll() {
  let inputSearch = document.getElementById("searchbar").value;
  inputSearch = inputSearch.toLowerCase();
  let x = document.querySelector("#data");
  let buttonsChecked = document.querySelectorAll("input:checked");
  x.innerHTML = "";
  if (buttonsChecked.length == "0" && inputSearch == "") {
    displayAll();
  } else if (buttonsChecked.length != "0") {
    filteredElements["duree de la formation"] = [];
    filteredElements["modalites acces"] = [];
    filteredElements["structure"] = [];
    filteredElements["searchBar"] = [];

    for (k = 0; k < buttonsChecked.length; k++) {
      filteredElements[buttonsChecked[k].name].push(
        searchOneFilter(buttonsChecked[k].name, buttonsChecked[k].value)
      );
      if (inputSearch != "") {
        for (
          j = 0;
          j <
          searchOneFilter(buttonsChecked[k].name, buttonsChecked[k].value)
            .length;
          j++
        ) {
          if (
            searchOneFilter(buttonsChecked[k].name, buttonsChecked[k].value)
              [j].innerHTML.toLowerCase()
              .includes(inputSearch)
          ) {
            filteredElements["searchBar"].push(
              searchOneFilter(buttonsChecked[k].name, buttonsChecked[k].value)[
                j
              ]
            );
          }
        }
      } else {
        for (list in filteredElements[buttonsChecked[k].name][0]) {
          
          x.appendChild(filteredElements[buttonsChecked[k].name][0][list]);
        }
      }
      
    }
    let filtUsed = [];
    for (ddd in filteredElements) {
      if (filteredElements[ddd].length != 0) {
        console.log(filteredElements[ddd]);
        filtUsed.push(ddd);
      }
      
    }

    console.log(filteredElements[filtUsed[1]][0].length);
    console.log(filteredElements[filtUsed[0]][0].length);
    if (filteredElements[filtUsed[0]][0].length > filteredElements[filtUsed[1]][0].length) {
       small = filteredElements[filtUsed[1]][0];
       smallSize = filteredElements[filtUsed[1]][0].length;
       big = filteredElements[filtUsed[0]][0];
       bigSize = filteredElements[filtUsed[0]][0].length;
    } else {
       small = filteredElements[filtUsed[0]][0];
       smallSize = filteredElements[filtUsed[0]][0].length;
      big = filteredElements[filtUsed[1]][0];
      bigSize = filteredElements[filtUsed[1]][0].length;
      
    }
    console.log("big: "+bigSize);
    console.log("small: "+smallSize);
    console.log(small[0].innerHTML);
    let result = [];
    for (size = 0; size < smallSize; size++) {
      for (size2 = 0; size2 < bigSize; size2++) {
        if (big[size2].innerHTML == small[size].innerHTML) {
          console.log("big: "+big[size2].innerHTML);
        console.log("small: "+small[size].innerHTML);
          console.log("yes");
          result.push(small[size]);
        }
      }
    }
    console.log(result);
    x.innerHTML = '';
    for (eachresult in result) {
      x.appendChild(result[eachresult]);
    }
    

    
    //const intersection = filteredElements[filtUsed][0].filter(element => array2.includes(element));
  } else {
    filteredElements["searchBar"] = [];

    for (a = 0; a < searchOneFilter("all", inputSearch).length; a++) {
      filteredElements["searchBar"][a] = searchOneFilter("all", inputSearch)[a];
    }
  }

  if (filteredElements["searchBar"].length == 0) {
  }
  for (j = 0; j < filteredElements["searchBar"].length; j++) {
    x.appendChild(filteredElements["searchBar"][j]);
  }
  //searchbar

  /*
  for (catFilt in filteredElements) {
    for (p = 0; p < filteredElements[catFilt].length; p++) {
      //FILTER ONE BY ONE (an array for fitler 1, an array for filter 3)

      for (
        filteredForm = 0;
        filteredForm < filteredElements[catFilt][p].length;
        filteredForm++
      ) {
        x.appendChild(filteredElements[catFilt][p][filteredForm]);
      }
    }
  }*/
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

function show() {
  let list2show = document.getElementsByClassName("form-control");
  for (cell = 0; cell < list2show.length;cell++) {
    list2show[cell].classList.toggle("show");
  }
}