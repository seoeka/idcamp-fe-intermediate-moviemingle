import logo from "../../images/logo.png";

class NavigationBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupSidemenu();
    this.handleScroll();
  }

  render() {
    this.innerHTML = `
        <nav class="fixed flex z-[10] w-full text-white font-bold text-20 lg:p-nav md:p-nav-md p-15 transition duration-300">
          <div class="flex items-center m-auto w-co justify-between xl:w-co-xl">
            <img src=${logo} alt="logo-app" class="xl:h-11 h-11"/>
            <div id="navbarMenu" class="hidden md:flex md:flex-row space-x-10 items-center">
                <a href="#home" class="hover:text-light_purple">Home</a>
                <a href="#movies" class="hover:text-light_purple">Movies</a>
                <a href="#search" class="hover:text-light_purple">Search</a>
                <a href="#about-us" class="hover:text-light_purple">About Us</a>
                <a href="#login" class="text-black bg-purple p-but rounded-5 hover:bg-light_purple">Login</a>
            </div>
            <div class="md:hidden">
                <button id="menuToggle" class=" text-white text-xl material-icons">menu</button>
            </div>
          </div>
        </nav>   
        <div id="sideMenu" class="hidden fixed w-full z-[100] top-0 right--30 bottom-0 left-0 backdrop-blur-sm">
          <div id="sideChild" class="absolute top-0 text-white right-0 bottom-0 w-30 py-4 bg-dark_blue drop-shadow-2xl z-[100] ">
            <div class="border-inherit p-sid flex justify-between m-auto">
              <img src=${logo} alt="logo-app" class="xl:h-11 h-11"/>
              <button id="closeToggle" class="material-icons text-xl">highlight_off</button>        
            </div>
            <a href="#home" class="border-b border-inherit block p-sid hover:text-light_purple">Home</a>
            <a href="#movies" class="border-b border-inherit block p-sid hover:text-light_purple">Movies</a>
            <a href="#search" class="border-b border-inherit block p-sid hover:text-light_purple">Search</a>
            <a href="#about-us" class="border-b border-inherit block p-sid hover:text-light_purple">About Us</a>
            <a href="#login" class="border-b border-inherit block p-sid hover:text-light_purple">Login</a>
          </div>
        </div>
        `;
  }

  setupSidemenu() {
    const closeToggle = this.querySelector("#closeToggle");
    const menuToggle = this.querySelector("#menuToggle");
    const sideMenu = this.querySelector("#sideMenu");
    const sideChild = this.querySelector("#sideChild");

    function toggleSideMenu() {
      sideMenu.classList.toggle("hidden");
      document.body.classList.toggle("overflow-hidden");
      sideChild.style.transition = "";
    }

    menuToggle.addEventListener("click", function () {
      sideChild.style.transition = "transform 0.3s ease-in-out";
      sideChild.style.transform = "translateX(0)";
      setTimeout(toggleSideMenu, 300);
    });

    closeToggle.addEventListener("click", function () {
      sideChild.style.transition = "transform 0.3s ease-in-out";
      sideChild.style.transform = "translateX(100%)";
      setTimeout(toggleSideMenu, 300);
    });
  }

  handleScroll() {
    const navbar = this.querySelector("nav");
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY > 50;
      navbar.classList.toggle("scrolled", scrolled);

      navbar.style.backgroundColor = scrolled
        ? "rgba(0, 31, 63, 1)"
        : "rgba(0, 31, 63, 0)";
    });
  }
}

customElements.define("navigation-bar", NavigationBar);
