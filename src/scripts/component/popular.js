import "./card/popular-item";
import DataSource from "../data/data-source";

class PopularSection extends HTMLElement {
  connectedCallback() {
    this.render();
    this.fetchPopularMovies();
  }

  async fetchPopularMovies() {
    try {
      const moviesData = await DataSource.fetchPopular();
      const movies = moviesData.results;
      this.renderMovies(movies);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  }

  renderMovies(movies) {
    const movieContainer = this.querySelector(".flex-row");
    movieContainer.innerHTML = "";

    movies.slice(0, 10).forEach((movie) => {
      const movieCard = document.createElement("popular-item");
      movieCard.setAttribute("src", movie.poster_path);
      movieCard.setAttribute("title", movie.title);
      movieCard.setAttribute("release-date", movie.release_date);
      movieCard.setAttribute("vote-average", movie.vote_average);
      movieContainer.appendChild(movieCard);
    });
  }

  render() {
    this.innerHTML = `
            <div id="movies" class="flex flex-col bg-light_gray font-bold py-11 space-y-5">
                <h2 class="w-co m-auto mb-0 text-xl">Popular Movies</h2>
                <div class="w-co m-auto flex flex-row space-x-5 scrollbar scrollbar-thumb-purple scrollbar-track-gray overflow-auto"></div>
            </div>`;
  }
}

customElements.define("popular-sec", PopularSection);
