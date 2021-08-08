const userDataFunctions = (function () {
  let userData = {
    booksData: [],
  };

  if (!localStorage.hasOwnProperty("bookshelfApp")) {
    updateLocalStorage();
  } else {
    userData = JSON.parse(localStorage.getItem("bookshelfApp"));
  }

  function updateLocalStorage() {
    localStorage.setItem("bookshelfApp", JSON.stringify(userData));
    events.emit("userDataChange", userData);
  }

  function addBook(bookInfo) {
    userData = { ...userData, booksData: [...userData.booksData, bookInfo] };

    console.log(userData);

    updateLocalStorage();
  }

  events.on("addBook", addBook);
  events.on("removeBook", removeBook);
})();
