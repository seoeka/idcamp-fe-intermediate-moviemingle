class SearchBar extends HTMLElement {
    connectedCallback() {
        this.render();
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
        `;
    }
}

customElements.define("search-bar", SearchBar);