import mainimg from "../../images/main-image.png";

class BannerBackground extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML =`
        <div id="home" class="h-screen sm:h-600 flex relative overflow-hidden">
        <div class="absolute inset-0" style="background-image: linear-gradient(96deg, #001F3F 30%, rgba(0, 31, 63, 0.73) 45%, rgba(0, 31, 63, 0.00) 70%);"></div>
        <img src="${mainimg}" alt="Background Image" class="object-cover w-full h-full sm:w-auto sm:h-auto ml-auto" style="margin-left: 25%; max-height: 100%;" />
        <div class="text-black absolute inset-0 flex flex-col m-auto w-co mb-10 sm:mb-14 lg:mb-16 justify-end" data-aos="fade-right" data-aos-duration="700">
            <p class="text-light_purple text-base font-bold">MovieMingle</p>
            <h1 class="text-white text-xl font-bold w-auto sm:w-40">Building Connections 
                Through the Art of <span class="text-light_purple">Movies</span></h1>
            <a class="mt-3 md:mt-4 mr-auto bg-purple p-but w-auto rounded-2 md:rounded-5 text-sm font-bold hover:bg-light_purple cursor-pointer">
                Join Community Now
            </a>
        </div>
    </div>
            `;
    }
}

customElements.define("banner-bg", BannerBackground);