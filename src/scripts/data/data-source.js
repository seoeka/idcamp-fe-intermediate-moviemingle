const $ = require('jquery');

class DataSource {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3/';
    this.accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2YxOTcyYThhMjM5MzYwYjkzODVmZTA0ZWQyZWQ5ZiIsInN1YiI6IjYzZWU1NTA2MWYzZTYwMDBjMDMzYWE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fiw1tZ1N7ayb0ncpaRGbXxPTPtr3Hb5a_9T_MUl1ZKg'; // Gantilah dengan token akses yang valid
  }

  authenticate() {
    const url = `${this.baseURL}authentication`;
    const settings = {
      async: true,
      crossDomain: true,
      url: url,
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    return $.ajax(settings)
      .then(response => {
        console.log(response);
        return response;
      })
      .fail(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  fetchPopular() {
    const url = `${this.baseURL}movie/popular?language=en-US&page=1`;
    const settings = {
      async: true,
      crossDomain: true,
      url: url,
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    };

    return $.ajax(settings)
      .then(response => {
        console.log(response);
        return response;
      })
      .fail(error => {
        console.error('Error:', error);
        throw error;
      });
  }
}

const dataSource = new DataSource();
export default dataSource;