import './card/category-item';
import './card/movie-item';
import DataSource from "../data/data-source";

class SearchBar extends HTMLElement {
    connectedCallback() {
        this.render();
        this.fetchCategoryList();
        this.fetchSearchList();
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

            catCard.addEventListener('click', () => {
                this.handleCategoryClick(catCard, category.id);
            });
        });
    }

    handleCategoryClick(catCard, categoryId) {
        const allCatCards = this.querySelectorAll('category-item');
        allCatCards.forEach(card => card.classList.remove('bg-dark_purple', 'text-white'));

        catCard.classList.add('bg-dark_purple', 'text-white');
        this.fetchAndRenderSearchResults(categoryId);
    }

    async fetchAndRenderSearchResults(categoryId) {
        try {
            const searchResults = await DataSource.fetchSearchByCategory(categoryId);
            this.renderSearch(searchResults.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    async fetchSearchList() {
        try {
            const searchData = await DataSource.fetchSearchIdle();
            const searches = searchData.results;
            this.renderSearch(searches);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    renderSearch(searches) {
        const sortedSearches = searches.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        const searchContainer = this.querySelector('.search-con');
        searchContainer.innerHTML = '';

        sortedSearches.slice(0, 8).forEach((search) => {
            const searchCard = document.createElement('movie-item');
            searchCard.setAttribute('src', search.poster_path);
            searchCard.setAttribute('title', search.title); 
            searchCard.setAttribute('release-date', search.release_date);
            searchCard.setAttribute('vote-average', search.vote_average);
            searchCard.setAttribute('id', search.genre_ids);
            searchContainer.appendChild(searchCard);
        });
    }

    render() {
        this.innerHTML =`
            <div id="search" class="flex flex-col bg-white w-co my-8 font-bold m-auto">
                <h3 class="flex m-auto w-fit text-lg mb-4">Find Movies, Discover Stories</h3>
                <div class="flex m-auto text-sm shadow-search items-center rounded-5 w-full md:w-fit p-2">
                    <span class="material-icons opacity-50 px-3 py-1">search</span>
                    <input id="searchElement" class="font-normal w-full md:w-40 px-1 pl-0 pr-2 focus:outline-none" placeholder="Search Movies..."></input>
                </div>
                <div class="flex flex-row m-auto font-bold mt-5 md:mt-0">
                    <div class="flex flex-col w-21 mr-3 md:mr-6">
                        <h4 class="py-2 px-3 md:px-6 text-base">Genre</h4>
                        <div class="cat"></div>
                    </div>
                    <div class="flex w-full flex-col h-fit ">
                        <h4 class="py-2 px-6 text-base text-white cursor-default">Search List</h4>
                        <div class="flex w-full flex-wrap justify-between search-con">
                        </div>
                    </div>
                </div>
            </div>   
        `;
    }
}

customElements.define("search-bar", SearchBar);