const main = () => {
  const searchBar = document.querySelector("search-bar");
  const categoryContainer = document.querySelector(".cat");
  const searchInputElement = document.querySelector("#searchElement");

  categoryContainer.addEventListener("click", async (event) => {
    if (event.target.tagName === "A") {
      const clickedCategoryId = event.target.id;

      const allCategoryCards = categoryContainer.querySelectorAll("a");
      allCategoryCards.forEach((card) => {
        card.classList.remove("bg-dark_purple", "text-white");
      });

      event.target.classList.add("bg-dark_purple", "text-white");
      searchInputElement.value = "";

      searchBar.lastAction = "category";
      searchBar.lastActionData = clickedCategoryId;
      searchBar.currentPage = 1;
      searchBar.performLastAction();
      togglePaginationButtons(searchBar.currentPage, searchBar.totalPage);
    }
  });

  searchInputElement.addEventListener("click", () => {
    searchBar.lastAction = "searchList";
    searchBar.currentPage = 1;
    searchBar.fetchSearchList();

    const allCatCards = categoryContainer.querySelectorAll("a");
    allCatCards.forEach((card) => {
      card.classList.remove("bg-dark_purple", "text-white");
    });

    searchBar.updateCurrentPage();
    togglePaginationButtons(searchBar.currentPage, searchBar.totalPage);
  });

  searchInputElement.addEventListener("input", () => {
    const query = searchInputElement.value;
    searchBar.lastAction = "query";
    searchBar.currentPage = 1;
    searchBar.fetchAndRenderQuery(query);

    const allCatCards = categoryContainer.querySelectorAll("a");
    allCatCards.forEach((card) => {
      card.classList.remove("bg-dark_purple", "text-white");
    });

    if (query === "") {
      searchBar.currentPage = 1;
      searchBar.fetchSearchList();
    }
    searchBar.updateCurrentPage();
    togglePaginationButtons(searchBar.currentPage, searchBar.totalPage);
  });

  const prevButton = document.querySelector("[data-type=\"prev\"]");
  const nextButton = document.querySelector("[data-type=\"next\"]");

  prevButton.addEventListener("click", () => {
    searchBar.currentPage = Math.max(1, searchBar.currentPage - 1);
    togglePaginationButtons(searchBar.currentPage, searchBar.totalPage);
    searchBar.performLastAction();
    searchBar.updateCurrentPage();
    document.getElementById("search").scrollIntoView({ behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    searchBar.currentPage = Math.min(
      searchBar.totalPage,
      searchBar.currentPage + 1,
    );
    togglePaginationButtons(searchBar.currentPage, searchBar.totalPage);
    searchBar.performLastAction();
    searchBar.updateCurrentPage();
    document.getElementById("search").scrollIntoView({ behavior: "smooth" });
  });

  const togglePaginationButtons = (currentPage, totalPage) => {
    const prevButton = document.querySelector("[data-type=\"prev\"]");
    const nextButton = document.querySelector("[data-type=\"next\"]");

    prevButton.style.display = currentPage === 1 ? "none" : "inline-block";
    nextButton.style.display =
      currentPage === totalPage ? "none" : "inline-block";
  };

  searchBar.currentPage = 1;
  togglePaginationButtons(searchBar.currentPage, searchBar.totalPage);
  searchBar.lastAction = localStorage.getItem("lastAction") || "searchList";

  const storedPage = localStorage.getItem("currentPage");
  if (storedPage) {
    searchBar.currentPage = parseInt(storedPage);
    searchBar.performLastAction();
    searchBar.updateCurrentPage();
  }
};

export default main;
