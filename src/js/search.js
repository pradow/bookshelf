const search = (function () {
  if (document.querySelector(".js-book-search")) {
    const body = document.querySelector("body");
    const bookSearchForm = document.querySelector(".js-book-search");
    const bookSearchInput = document.querySelector("#bookSearch");

    const apiUrl = "http://openlibrary.org/search.json?q=";

    async function fetchData(url) {
      pageStateChange("search");
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        events.emit("searchDataChange", data);
      } catch (error) {
        console.error(error);
      }
    }

    function searchBooks(e) {
      e.preventDefault();

      if (!bookSearchInput.value.replace(/ /g, "")) {
        return;
      }
      const searchValue = bookSearchInput.value.replace(/ /g, "+");
      const data = fetchData(apiUrl + searchValue);

      console.log("searching...");
    }

    function pageStateChange(page) {
      const pagesArray = ["home", "search", "results", "bookshelf"];
      pagesArray.forEach((item) => {
        if (item !== page) {
          body.classList.remove(item);
        } else {
          body.classList.add(item);
        }
      });
    }

    bookSearchForm.addEventListener("submit", searchBooks);

    return {
      pageStateChange,
    };
  }
})();
