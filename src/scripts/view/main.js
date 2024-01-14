import DataSource from "../data/data-source.js";

function main() {
    const searchBar = document.querySelector('search-bar');
    const categoryContainer = document.querySelector('.cat');

    categoryContainer.addEventListener('click', async (event) => {
        if (event.target.tagName === 'A') {
            const clickedCategoryId = event.target.id;

            const allCategoryCards = categoryContainer.querySelectorAll('a');
            allCategoryCards.forEach(card => {
                card.classList.remove('bg-dark_purple', 'text-white');
            });

            event.target.classList.add('bg-dark_purple', 'text-white');

            const searchResults = await DataSource.fetchSearchByCategory(clickedCategoryId);
            searchBar.renderSearch(searchResults.results);
        }
    });
}

export default main;
