(function () {
  "use strict";

  const bookSearchForm = document.querySelector(".js-book-search");
  const bookSearchInput = document.querySelector("#bookSearch");
  const searchResultsContainer = document.querySelector(".js-search-results");
  const apiUrl = "http://openlibrary.org/search.json?q=";

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      populateData(data);
    } catch (error) {
      console.error(error);
    }
  }

  function searchBooks(e) {
    e.preventDefault();

    const searchValue = bookSearchInput.value.replace(/ /g, "+");
    const data = fetchData(apiUrl + searchValue);
  }

  function populateData(data) {
    let htmlToAppend;
    data.docs.forEach((item) => {
      htmlToAppend += `<h3 class='book-title'>${item.title}</h3>`;
    });

    searchResultsContainer.innerHTML = htmlToAppend;
  }

  bookSearchForm.addEventListener("submit", searchBooks);
})();
