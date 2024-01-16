import "./card/category-item";
import "./card/movie-item";
import DataSource from "../data/data-source";

class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
    this.resultsPerPage = 20;
    this.totalPage = 10;
    this.lastAction = "searchList";
  }

  connectedCallback() {
    this.render();
    this.fetchCategoryList();
    this.performLastAction();
  }

  performLastAction() {
    switch (this.lastAction) {
    case "searchList":
      this.fetchSearchList();
      break;
    case "category":
      this.fetchAndRenderCategory(this.lastActionData);
      break;
    case "query": {
      const queryInputElement = this.querySelector("#searchElement");
      const query = queryInputElement.value;
      this.fetchAndRenderQuery(query);
      break;
    }
    default:
      this.fetchSearchList();
      break;
    }
    if (!localStorage.getItem("currentPage")) {
      this.currentPage = 1;
      this.updateCurrentPage();
    }
  }

  async fetchCategoryList() {
    try {
      const catData = await DataSource.fetchCategory();
      const categories = catData.genres;
      this.renderCat(categories);
    } catch (error) {
      console.error("Error fetching movies genres:", error);
    }
  }

  renderCat(categories) {
    const movieCategory = this.querySelector(".cat");
    movieCategory.innerHTML = "";

    categories.forEach((category) => {
      const catCard = document.createElement("category-item");
      catCard.setAttribute("id", category.id);
      catCard.setAttribute("name", category.name);
      movieCategory.appendChild(catCard);
    });
  }

  async fetchSearchList() {
    try {
      this.updateCurrentPage();
      const searchData = await DataSource.fetchSearchIdle(this.currentPage);
      const searches = searchData.results;
      const total = searchData.total_results;
      this.totalPage = Math.min(10, Math.ceil(total / this.resultsPerPage));
      this.renderSearch(searches, total);
      localStorage.setItem("currentPage", this.currentPage);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  async fetchAndRenderQuery(query) {
    try {
      const searchResults = await DataSource.fetchSearchByQuery(
        query,
        this.currentPage,
      );
      if (query == "") {
        this.renderSearch(searchResults.results, searchResults.total_results);
      } else {
        if (searchResults.results.length === 0) {
          this.renderNotFound();
        } else {
          this.renderSearch(searchResults.results, searchResults.total_results);
        }
      }
      this.totalPage = Math.min(
        10,
        Math.ceil(searchResults.total_results / this.resultsPerPage),
      );
      this.updateCurrentPage();
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  renderSearch(searches) {
    const sortedSearches = searches.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date),
    );

    const searchContainer = this.querySelector(".search-con");
    searchContainer.innerHTML = "";

    sortedSearches.slice(0, 20).forEach((search) => {
      const searchCard = document.createElement("movie-item");
      searchCard.setAttribute("src", search.poster_path);
      searchCard.setAttribute("title", search.title);
      searchCard.setAttribute("release-date", search.release_date);
      searchCard.setAttribute("vote-average", search.vote_average);
      searchCard.setAttribute("id", search.genre_ids);
      searchContainer.appendChild(searchCard);
    });
  }

  renderNotFound() {
    const searchContainer = this.querySelector(".search-con");

    searchContainer.innerHTML = `
            <div class="flex w-full">
                <p class="flex w-full m-auto">There are no movies that matched your query.</p>
            </div>`;
  }

  async fetchAndRenderCategory(categoryId) {
    try {
      const searchResults = await DataSource.fetchSearchByCategory(
        categoryId,
        this.currentPage,
      );
      this.totalPage = Math.min(
        10,
        Math.ceil(searchResults.total_results / this.resultsPerPage),
      );
      this.updateCurrentPage();
      this.renderSearch(searchResults.results, searchResults.total_results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  render() {
    this.innerHTML = `
            <style>
                .num {
                    width:35px;
                    height:35px;
                    border-radius: 5px;
                }
            </style>


            <div id="search" class="flex flex-col bg-white w-co my-8 font-bold m-auto">
                <h3 class="flex m-auto w-fit text-lg mb-4" data-aos="fade-up" data-aos-duration="700">Find Movies, Discover Stories</h3>
                <div class="flex m-auto text-sm shadow-search items-center rounded-5 w-full md:w-fit p-2" data-aos="fade-up" data-aos-duration="800">
                    <span class="material-icons opacity-50 px-3 py-1">search</span>
                    <input id="searchElement" class="font-normal w-full md:w-40 px-1 pl-0 pr-2 focus:outline-none" placeholder="Search Movies..."></input>
                </div>
                <div class="flex flex-row font-bold mt-5 md:mt-0" data-aos="fade-right" data-aos-duration="1000">
                    <div class="hidden md:flex flex-col w-21 mr-3 md:mr-6">
                        <h4 class="py-2 px-3 md:px-6 text-base">Genre</h4>
                        <div class="cat"></div>
                    </div>
                    <div class="flex w-full flex-col h-fit">
                        <h4 class="py-2 px-6 text-base text-white cursor-default">.</h4>
                        <div class="flex w-full flex-wrap search-con justify-center m-auto gap-3 search-con"></div>
                        <div class="flex flex-row ml-auto items-center">
                            <div class="pagination text-dark_purple">
                                <button data-type="prev" class="num border border-dark_purple  hover:bg-dark_purple hover:text-white">&lt;</button>
                                <button id="currentPage" class="num border cursor-text border-dark_purple bg-dark_purple text-white">${this.currentPage}</button> 
                                <button class="mid px-2 cursor-text"> of </button>
                                <button id="lastPage" class="num border cursor-text border-dark_purple">${this.totalPage}</button>
                                <button data-type="next" class="num border border-dark_purple hover:bg-dark_purple hover:text-white">&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    this.updateCurrentPage();
  }

  updateCurrentPage() {
    localStorage.setItem("currentPage", this.currentPage);
    const currentPageElement = this.querySelector("#currentPage");
    currentPageElement.textContent = this.currentPage;

    const lastPageElement = this.querySelector("#lastPage");
    lastPageElement.textContent = this.totalPage;
  }
}

customElements.define("search-bar", SearchBar);
