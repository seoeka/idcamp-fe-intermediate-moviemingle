import nullimg from "../../../images/null-image.png";

class MovieItem extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    fDate(dateString) {
        const opt = { year: 'numeric', month: 'short', day: 'numeric' };
        const formatDate = new Date(dateString).toLocaleDateString(undefined, opt);
        return formatDate;
    }

    render(){
        const ReleaseDate = this.fDate(this.getAttribute("release-date"));
        const vAverage = parseFloat(this.getAttribute("vote-average"));
        const VoteAverage = vAverage.toFixed(1);

        const src = (this.getAttribute("src") !== "null" && this.getAttribute("src") !== undefined)
        ? `https://media.themoviedb.org/t/p/w220_and_h330_face${this.getAttribute("src")}` : `${nullimg}`;

        this.innerHTML = `
            <div class="flex flex-col cursor-pointer mb-7" id="${this.getAttribute("id")}">
                <div class="h-24 w-16 relative hover:-translate-y-2 duration-200">
                    <img src="${src}" alt="${this.getAttribute("title")}" 
                     class="h-full w-full object-cover rounded-10 transition-all shadow-2xl duration-200 brightness-95 hover:brightness-110">
                    <div class="flex absolute top-3 text-xs right-3 rounded-5 px-1 py-2r bg-purple text-black items-center">
                        <span class="material-icons text-xs mr-1">star</span>
                        ${VoteAverage}
                    </div>                
                </div>
                <div class="mt-5">
                    <h4 class="text-sm overflow-hidden whitespace-nowrap w-16 text-ellipsis hover:text-dark_purple">${this.getAttribute("title")}</h4>
                    <p class="text-xs font-normal">${ReleaseDate}</p>
                </div>
            </div>
        `;
    }
}
   
customElements.define('movie-item', MovieItem);