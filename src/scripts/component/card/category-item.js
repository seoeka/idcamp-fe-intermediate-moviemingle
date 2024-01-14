class CategoryItem extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = `
            <div class="flex flex-col font-bold">
                <a id="${this.getAttribute("id")}"}" 
                    class="py-2 px-3 md:px-6 mb-1 rounded-5 cursor-pointer text-xs md:text-sm
                  hover:text-white hover:bg-dark_purple">${this.getAttribute("name")}
                </a>
            </div>
        `;
    }
}
   
customElements.define('category-item', CategoryItem);