json = new Array();
basket = new Array();
filters = new Array();
searchedElements = new Array();
filteredElements = new Array();
filteredOneList = new Array();
filteredjson = new Array(); //quand filtres selectionnées, on stock les formations correspondante ici. Utile pour la searchbar
fetch("data/Final_V33.json")
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

function addPanier(ev) {
  if (basket[ev["ID"]] == null) {
    basket[ev["ID"]] = json[ev["ID"]];
  } else {
    delete basket[ev["ID"]];
  }
    console.log(basket);
}

function displayAll() {
  json.forEach((formation) => {
    var table_button = document.createElement("button");
    var table_output = document.createElement("li");
      table_button.innerText = "Ajouter";

    table_button.classList.add("add_panier");
    
    table_output.onclick = function () {
      if (!table_output.classList.contains("detailed")) {
        table_output.innerHTML += formation["description"];
        table_output.classList.add("detailed");
      } else {
        table_output.innerHTML = table_output.innerHTML.replace(
          formation["description"],
          ""
        );
        table_output.classList.remove("detailed");
        }
    };
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
      duree = formation["duree de la formation"] + " jour(s)";
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
    table_button.onclick = function () {
        addPanier(formation);
        afficherTableau();
      };
    document
      .getElementById("data")
      .appendChild(table_output)
      .append(table_button);
  });
}

function searchInCat(id, cat, val) {
  console.log(cat);
  console.log(val);
  if (typeof json[id][cat] !== "undefined" && json[id][cat] == val) {
    return true;
  } else {
    return false;
  }
}

function searchAll() {
  let result = [];
  let ul = document.getElementsByClassName("listePrincipale");
  let inputSearch = document.getElementById("searchbar").value;
  let buttonsChecked = document.querySelectorAll("input:checked");
  console.log(buttonsChecked);
  inputSearch = inputSearch.toLowerCase();
  for (li = 0; li < ul.length; li++) {
    current_li = ul[li];
    current_li.style.display = "inline-block";
    if (!current_li.innerHTML.toLowerCase().includes(inputSearch)) {
      current_li.style.display = "none";
    } else {
      if (buttonsChecked.length != 0) {
        for (btn = 0; btn < buttonsChecked.length; btn++) {
          console.log(buttonsChecked[btn].name);
          if (
            !searchInCat(
              current_li.id - 1,
              buttonsChecked[btn].name,
              buttonsChecked[btn].value
            )
          ) {
            current_li.style.display = "none";
            break;
          } else {
            current_li.style.display = "inline-block";
          }
        }
      }
    }
  }
}

function show() {
  let list2show = document.getElementsByClassName("form-control");
  for (cell = 0; cell < list2show.length; cell++) {
    list2show[cell].classList.toggle("show");
  }
}

function afficherTableau() {
  tableau = document.getElementById("panier");
  tableau.innerHTML = `<tr>
 </tr>`;
  tableau.classList.toggle("active");
  for (var formation in basket) {
    var row = document.createElement("tr");

    for (element in basket[formation]) {
      if (element != "ID") {
        var cell = document.createElement("td");
        cell.appendChild(document.createTextNode(basket[formation][element]));
        row.appendChild(cell);
      }
    }

    tableau.appendChild(row);
  }
}

function tableToCSV() {
  var csv_data = [];

  var rows = document.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].querySelectorAll("td,th");

    var csvrow = [];
    for (var j = 0; j < cols.length; j++) {
      csvrow.push(cols[j].innerHTML);
    }

    csv_data.push(csvrow.join(","));
  }

  csv_data = csv_data.join("\n");
  // Call this function to download csv file
  downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
  CSVFile = new Blob([csv_data], { type: "text/csv" });

  var temp_link = document.createElement("a");

  temp_link.download = "Devis_Formation.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  temp_link.click();
  document.body.removeChild(temp_link);
}

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }