// Gets de html
const searchBar = document.getElementById("barSearch");
const searchForm = document.querySelector("form[role='search']");
const searchResultsBox = document.getElementById("box-search");

// prevencion de default
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchBar.value.trim() === "") {
        alert("Please enter a search term.");
    }
});

//Filtrado de los searches en rt
searchBar.addEventListener("keyup", () => {
    const query = searchBar.value.toUpperCase(); // Get user input
    const items = searchResultsBox?.getElementsByTagName("li") || []; // Get list items

    let hasResults = false;

    // Filtrado de resultados
    for (let i = 0; i < items.length; i++) {
        const itemText = items[i].innerText || items[i].textContent;

        if (itemText.toUpperCase().includes(query)) {
            // Mostrar resultados que coincidan
            items[i].style.display = ""; 
            hasResults = true;
        } else {
            items[i].style.display = "none"; 
        }
    }

    // Mostrar/oculrtar resultados
    if (searchResultsBox) {
        searchResultsBox.style.display = hasResults && query !== "" ? "block" : "none";
    }
});
