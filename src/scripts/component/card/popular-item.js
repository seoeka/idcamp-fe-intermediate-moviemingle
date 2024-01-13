class PopularItem extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = `
            <div class="flex flex-col space-x-5">
                <div class="h-38 w-26">
                    <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${this.getAttribute("src")}" alt="${this.getAttribute("title")}" class="h-auto w-auto object-cover">
                </div>
                <div>
                    <h4>${this.getAttribute("title")}</h4>
                    <p>${this.getAttribute("release-date")}</p>
                </div>
            </div>
        `;
    }
}
   
customElements.define('popular-item', PopularItem);