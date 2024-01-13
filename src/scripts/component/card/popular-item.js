class PopularItem extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    render(){
        const formattedReleaseDate = this.formatDate(this.getAttribute("release-date"));

        this.innerHTML = `
            <div class="flex flex-col mb-5 mt-2 cursor-pointer">
                <div class="h-30 w-20">
                    <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${this.getAttribute("src")}" alt="${this.getAttribute("title")}" 
                     class="h-full w-full object-cover rounded-10 transition-all shadow-2xl duration-200 hover:-translate-y-2 brightness-95 hover:brightness-110">
                </div>
                <div class="mt-5 mb-4">
                    <h4 class="text-base overflow-hidden whitespace-nowrap w-20 text-ellipsis hover:text-dark_purple">${this.getAttribute("title")}</h4>
                    <p class="font-normal">${formattedReleaseDate}</p>
                </div>
            </div>
        `;
    }
}
   
customElements.define('popular-item', PopularItem);