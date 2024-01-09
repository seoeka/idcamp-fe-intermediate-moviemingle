import logo from "../../images/logo.png";

class NavigationBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupDropdown();
  }

  render() {
    this.innerHTML = `
      <nav class="flex relative z-[99] w-full text-white font-bold text-20 bg-dark_blue lg:p-nav md:p-nav-md p-nav-sm items-center justify-between">
        <img src=${logo} alt="logo-app" class="xl:h-11 h-11"/>
        <div id="navbarMenu" class="hidden md:flex md:flex-row space-x-10 items-center">
            <a href="#home" class="hover:text-light_purple">Home</a>
            <a href="#movies" class="hover:text-light_purple">Movies</a>
            <a href="#search" class="hover:text-light_purple">Search</a>
            <a href="#about-us" class="hover:text-light_purple">About Us</a>
            <a href="#login" class="text-black bg-purple py-2 px-5 rounded-5 hover:bg-light_purple">Login</a>
        </div>
        <div class="md:hidden">
            <button id="menuToggle" class="text-white focus:outline-none">
            &#x25BE;
            </button>
        </div>
      </nav>   
      <div id="sideMenu" class="dropdown-content text-white flex fixed items-start space-y-5 z-[100] md:hidden menu px-8 py-5 right-0 shadow-lg flex-col transition bg-dark_blue rounded-10">
        <a href="#home" class="hover:text-light_purple">Home</a>
        <a href="#movies" class="hover:text-light_purple">Movies</a>
        <a href="#search" class="hover:text-light_purple">Search</a>
        <a href="#about-us" class="hover:text-light_purple">About Us</a>
        <a href="#login" class="text-black bg-purple py-2 px-5 rounded-5 hover:bg-light_purple">Login</a>
      </div>   
      `;
  }

  setupDropdown() {
    const menuToggle = this.querySelector("#menuToggle");
    const sideMenu = this.querySelector("#sideMenu");

    menuToggle.addEventListener("click", function () {
      sideMenu.classList.toggle("hidden");
    });
  }
}

customElements.define("navigation-bar", NavigationBar);