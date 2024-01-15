import DataSource from "../data/data-source.js";

function main() {
    const searchBar = document.querySelector('search-bar');
    const categoryContainer = document.querySelector('.cat');
    const searchInputElement = document.querySelector('#searchElement');

    categoryContainer.addEventListener('click', async (event) => {
        if (event.target.tagName === 'A') {
            const clickedCategoryId = event.target.id;

            const allCategoryCards = categoryContainer.querySelectorAll('a');
            allCategoryCards.forEach(card => {
                card.classList.remove('bg-dark_purple', 'text-white');
            });

            event.target.classList.add('bg-dark_purple', 'text-white');
            searchInputElement.value = '';
            searchBar.fetchAndRenderCategory(clickedCategoryId);
        }
    });

    searchInputElement.addEventListener('input', () => {
        const query = searchInputElement.value;
        searchBar.fetchAndRenderQuery(query);
        searchBar.clearCategoryColors();

        if (query == "") {
            searchBar.fetchSearchList();
        }
    });
    
}

export default main;