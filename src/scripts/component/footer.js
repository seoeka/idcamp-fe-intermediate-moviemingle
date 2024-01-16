import mainimg from "../../images/main-image.png";
import logo from "../../images/logo.png";

class FooterCo extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="flex relative h-16">
                <div class="absolute inset-0 bg-black bg-opacity-50"></div>
                <img src="${mainimg}" class="flex w-full h-full object-cover"></img>
                <div class="text-white font-bold absolute inset-0 flex flex-col m-auto justify-center w-full h-fit items-center>
                    <div class="flex justify-center flex-col">
                        <div class="flex logo-container m-auto h-12 w-auto">
                            <img src="${logo}" class="h-full object-contain"></img>
                        </div>                        
                        <div class="flex justify-center space-x-10 ">
                            <a href="#home" class="hover:text-light_purple">Home</a>
                            <a href="#movies" class="hover:text-light_purple">Movies</a>
                            <a href="#search" class="hover:text-light_purple">Search</a>
                            <a href="#about-us" class="hover:text-light_purple">About Us</a>      
                        </div>
                    </div>    
                </div>
            </div>
            <div class="flex justify-center bg-dark_blue text-white  align-middle">
                <span class="font-bold py-6">© 2024 
                    <a href="https://github.com/seoeka/" class="text-light_purple">seoeka</a>. All Right Reserved
                </span>
            </div>
        `;
  }
}

customElements.define("footer-co", FooterCo);
