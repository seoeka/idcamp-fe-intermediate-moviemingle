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

            searchBar.lastAction = 'category';
            searchBar.lastActionData = clickedCategoryId;
            searchBar.currentPage = 1;
            searchBar.performLastAction();
        }
    });

    searchInputElement.addEventListener('click', () => {
        searchBar.lastAction = 'searchList';
        searchBar.currentPage = 1;
        searchBar.fetchSearchList();

        const allCatCards = categoryContainer.querySelectorAll('a');
        allCatCards.forEach(card => {
            card.classList.remove('bg-dark_purple', 'text-white');
        });

        searchBar.updateCurrentPage(); 
    });

    searchInputElement.addEventListener('input', () => {
        const query = searchInputElement.value;
        searchBar.lastAction = 'query';
        searchBar.currentPage = 1;
        searchBar.fetchAndRenderQuery(query);

        const allCatCards = categoryContainer.querySelectorAll('a');
        allCatCards.forEach(card => {
            card.classList.remove('bg-dark_purple', 'text-white');
        });

        if (query === "") {
            searchBar.currentPage = 1;
            searchBar.fetchSearchList();
            searchBar.updateCurrentPage();
        }
    });

    const prevButton = document.querySelector('[data-type="prev"]');
    const nextButton = document.querySelector('[data-type="next"]');

    prevButton.addEventListener('click', () => {
        searchBar.currentPage = Math.max(1, searchBar.currentPage - 1);
        searchBar.performLastAction();
        
        searchBar.updateCurrentPage();
    });

    nextButton.addEventListener('click', () => {

        searchBar.currentPage = Math.min(searchBar.totalPage, searchBar.currentPage + 1);
        searchBar.performLastAction();

        searchBar.updateCurrentPage();
    });

    searchBar.currentPage =  1;
    searchBar.lastAction = localStorage.getItem('lastAction') || 'searchList';

    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
        searchBar.currentPage = parseInt(storedPage);
        searchBar.performLastAction();
        searchBar.updateCurrentPage();
    }
}

export default main;