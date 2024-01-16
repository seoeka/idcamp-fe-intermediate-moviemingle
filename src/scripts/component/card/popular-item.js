import nullimg from "../../../images/null-image.png";

class PopularItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options,
    );
    return formattedDate;
  }

  render() {
    const formattedReleaseDate = this.formatDate(
      this.getAttribute("release-date"),
    );
    const voteAverage = parseFloat(this.getAttribute("vote-average"));
    const formattedVoteAverage = voteAverage.toFixed(1);

    const src =
      this.getAttribute("src") !== "null" &&
      this.getAttribute("src") !== undefined
        ? `https://media.themoviedb.org/t/p/w220_and_h330_face${this.getAttribute("src")}`
        : `${nullimg}`;

    this.innerHTML = `
            <div class="flex flex-col mb-5 mt-2 cursor-pointer">
                <div class="h-30 w-20 relative hover:-translate-y-2 duration-200">
                    <img src="${src}" alt="${this.getAttribute("title")}" 
                     class="h-full w-full object-cover rounded-10 transition-all shadow-2xl duration-200 brightness-95 hover:brightness-110">
                    <div class="flex absolute top-3 right-3 rounded-5 px-2 py-2r bg-purple text-black items-center">
                        <span class="material-icons text-sm mr-1">star</span>
                        ${formattedVoteAverage}
                    </div>                
                </div>
                <div class="mt-5 mb-4">
                    <h4 class="text-base overflow-hidden whitespace-nowrap w-20 text-ellipsis hover:text-dark_purple">${this.getAttribute("title")}</h4>
                    <p class="font-normal">${formattedReleaseDate}</p>
                </div>
            </div>
        `;
  }
}

customElements.define("popular-item", PopularItem);
