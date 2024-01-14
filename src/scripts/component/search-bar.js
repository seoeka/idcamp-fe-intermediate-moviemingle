import './card/category-item';
import DataSource from "../data/data-source";

class SearchBar extends HTMLElement {
    connectedCallback() {
        this.render();
        this.fetchCategoryList();
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

    render() {
        this.innerHTML =`
            <div id="search" class="flex flex-col bg-white w-co my-8 font-bold m-auto">
                <h3 class="flex m-auto w-fit text-lg mb-4">Find Movies, Discover Stories</h3>
                <div class="flex m-auto text-sm shadow-search items-center rounded-5 w-full md:w-fit p-2">
                    <span class="material-icons opacity-50 px-3 py-1">search</span>
                    <input id="searchElement" class="font-normal w-full md:w-40 px-1 pl-0 pr-2 focus:outline-none" placeholder="Search Movies..."></input>
                </div>
            </div>
            <div class="w-co m-auto font-bold">
                <div class="flex flex-col w-21">
                    <h4 class="py-2 px-6">Genre</h4>
                    <div class="cat"></div>
                </div>
                <div class="flex flex-wrap">
                
                </div>
            </div>
        `;
    }
}

customElements.define("search-bar", SearchBar);