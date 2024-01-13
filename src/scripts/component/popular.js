import './card/popular-item';
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
            console.error('Error fetching popular movies:', error);
        }
    }

    renderMovies(movies) {
        const movieContainer = this.querySelector('.flex-row');
        movieContainer.innerHTML = '';

        movies.slice(0, 10).forEach((movie) => {
            const movieCard = document.createElement('popular-item');
            movieCard.setAttribute('src', movie.poster_path);
            movieCard.setAttribute('title', movie.title); 
            movieCard.setAttribute('release-date', movie.release_date);
            movieContainer.appendChild(movieCard);
        });
    }

    render() {
        this.innerHTML = `
            <div id="movie" class="flex flex-col bg-light_gray font-bold py-11 space-y-5">
                <h2 class="w-co m-auto text-xl">Popular Movies</h2>
                <div class="w-co m-auto flex flex-row"></div>
                <div class="w-co m-auto h-3 bg-gray"></div>
            </div>`;
    }
}

customElements.define("popular-sec", PopularSection);