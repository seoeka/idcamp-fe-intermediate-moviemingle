import aboutimg from "../../images/about-us-mm.png";

class AboutUs extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div id="about-us" class="bg-light_gray">
            <div class="flex flex-col md:flex-row items-center w-co m-auto py-11">
                <div class="w-full md:w-1/4 max-h-20 min-h-15 md:order-2 mb-8 md:mb-0">
                    <img src="${aboutimg}" class="max-h-20 m-auto"></img>
                </div>
                <div class="w-full md:w-3/4 md:mr-7 md:order-1">
                    <a class="text-2xl font-bold">About <span class="text-purple">Us</span></a>
                    <p class="text-base">At MovieMingle, we believe in the power of storytelling and the profound impact it has on our lives. 
                       Our journey began with a shared love for the art of filmmaking and the desire to create a space where fellow movie lovers could connect, 
                       share experiences, and celebrate the world of cinema.
                    </p>
                </div>
            </div>
        </div>
            `;
  }
}

customElements.define("about-us", AboutUs);
