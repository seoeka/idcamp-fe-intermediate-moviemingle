import './card/category-item';
import './card/movie-item';
import DataSource from "../data/data-source";

class Total {
    constructor(element) {
        this.element = element;
    }

    updateTotal(total) {
        if (total === null || total === undefined) {
            this.element.textContent = `Total Results: 0`;
        } else {
            this.element.textContent = `Total Results: ${total}`;
        }
    }
}

class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.totalElement = null;
        this.currentPage = parseInt(localStorage.getItem('currentPage')) || 1;     
        this.resultsPerPage = 20;
        this.totalPage = 10;
        this.lastAction = 'searchList';
    }

    connectedCallback() {
        this.render();
        this.fetchCategoryList();
        this.performLastAction();
        this.totalElement = new Total(this.querySelector('.total'));
    }

    performLastAction() {
        switch (this.lastAction) {
            case 'searchList':
                this.fetchSearchList();
                break;
            case 'category':
                this.fetchAndRenderCategory(this.lastActionData);
                break;
            case 'query':
                const queryInputElement = this.querySelector('#searchElement');
                const query = queryInputElement.value;
                this.fetchAndRenderQuery(query);
                break;
            default:
                this.fetchSearchList();
                break;
        }
        if (!localStorage.getItem('currentPage')) {
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
            console.error('Error fetching movies genres:', error);
        }
    }

    renderCat(categories) {
        const movieCategory = this.querySelector('.cat');
        movieCategory.innerHTML = '';

        categories.forEach((category) => {
            const catCard = document.createElement('category-item');
            catCard.setAttribute('id', category.id);
            catCard.setAttribute('name', category.name); 
            movieCategory.appendChild(catCard);
        });
    }

    async fetchSearchList() {
        try {
            this.updateCurrentPage();
            const searchData = await DataSource.fetchSearchIdle(this.currentPage);
            const searches = searchData.results;
            const total = searchData.total_results;
            this.renderSearch(searches, total);
            localStorage.setItem('currentPage', this.currentPage);  // Simpan setelah updateCurrentPage

        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    async fetchAndRenderQuery(query) {
        try {
            const searchResults = await DataSource.fetchSearchByQuery(query, this.currentPage);
            this.totalPage = Math.ceil(searchResults.total_results / this.resultsPerPage);
            if (query== ""){
                this.renderSearch(searchResults.results, searchResults.total_results);
            } else {
                if (searchResults.results.length === 0) {
                    this.renderNotFound();
                    this.totalElement.updateTotal(null);
                } else {
                    this.renderSearch(searchResults.results, searchResults.total_results);
                }
            }
            this.updateCurrentPage();
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    renderSearch(searches, total) {
        const sortedSearches = searches.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        const searchContainer = this.querySelector('.search-con');
        searchContainer.innerHTML = '';

        sortedSearches.slice(0, 20).forEach((search) => {
            const searchCard = document.createElement('movie-item');
            searchCard.setAttribute('src', search.poster_path);
            searchCard.setAttribute('title', search.title); 
            searchCard.setAttribute('release-date', search.release_date);
            searchCard.setAttribute('vote-average', search.vote_average);
            searchCard.setAttribute('id', search.genre_ids);
            searchContainer.appendChild(searchCard);
        });

        this.totalElement.updateTotal(total);
    }

    renderNotFound() {
        const searchContainer = this.querySelector('.search-con');

        searchContainer.innerHTML = `
            <div class="flex w-full">
                <p class="flex w-full m-auto">There are no movies that matched your query.</p>
            </div>`;
    }

    async fetchAndRenderCategory(categoryId) {
        try {
            const searchResults = await DataSource.fetchSearchByCategory(categoryId, this.currentPage);
            this.renderSearch(searchResults.results, searchResults.total_results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }
    
    render() {
        this.innerHTML =`
            <div id="search" class="flex flex-col bg-white w-co my-8 font-bold m-auto">
                <h3 class="flex m-auto w-fit text-lg mb-4">Find Movies, Discover Stories</h3>
                <div class="flex m-auto text-sm shadow-search items-center rounded-5 w-full md:w-fit p-2">
                    <span class="material-icons opacity-50 px-3 py-1">search</span>
                    <input id="searchElement" class="font-normal w-full md:w-40 px-1 pl-0 pr-2 focus:outline-none" placeholder="Search Movies..."></input>
                </div>
                <div class="flex flex-row font-bold mt-5 md:mt-0">
                    <div class="flex flex-col w-21 mr-3 md:mr-6">
                        <h4 class="py-2 px-3 md:px-6 text-base">Genre</h4>
                        <div class="cat"></div>
                    </div>
                    <div class="flex w-full flex-col h-fit ">
                        <h4 class="py-2 px-6 text-base text-white cursor-default">Search List</h4>
                        <div class="flex w-full flex-wrap justify-between search-con">
                        </div>
                        <div class="total">Total Results : ${this.getAttribute("total-results")}</div>
                        <div class="pagination">
                            <button data-type="prev">&lt;</button>
                            <span>Page 
                            <span id="currentPage">${this.currentPage}</span> of 
                            <span id="lastPage">${this.totalPage}</span></span>
                            <button data-type="next">&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.updateCurrentPage();
    }
    
    updateCurrentPage() {
        localStorage.setItem('currentPage', this.currentPage);
        const currentPageElement = this.querySelector('#currentPage');
        currentPageElement.textContent = this.currentPage;

        const lastPageElement = this.querySelector('#lastPage');
        lastPageElement.textContent = this.totalPage;  // Perbarui totalPage
    }
}

customElements.define("search-bar", SearchBar);