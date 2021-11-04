import { FetchMovies } from "./fetchMovies.js";

const inTheatersList = new FetchMovies('genre/movie/list')
const movieList = new FetchMovies('movie/now_playing')