import mainimg from "../../images/main-image.png";

class BannerBackground extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML =`
        <div class="h-600 flex flex-shrink-0 relative overflow-hidden">
        <div class="absolute inset-0" style="background-image: linear-gradient(96deg, #001F3F 30%, rgba(0, 31, 63, 0.73) 45%, rgba(0, 31, 63, 0.00) 70%);"></div>
        <img src="${mainimg}" alt="Background Image" class="object-cover w-full h-full ml-auto" style="margin-left: 25%;"/>
            <div class="text-black absolute inset-0 flex flex-col w-25 md:w-40 m-ban-sm md:m-ban-md lg:m-ban justify-center">
                <p class="text-light_purple text-xs md:text-base font-bold">MovieMingle</p>
                <h1 class="text-white text-base md:text-xl font-bold">Building Connections 
                Through the Art of <span class="text-light_purple">Movies</span></h1>
                <a class="mt-3 md:mt-4 mr-auto bg-purple p-but-sm md:p-but-md w-auto rounded-2 md:rounded-5 text-xxs md:text-sm font-bold hover:bg-light_purple inline-block">
                Join Community Now</a>
            </div>
        </div>
            `;
    }
}

customElements.define("banner-bg", BannerBackground);