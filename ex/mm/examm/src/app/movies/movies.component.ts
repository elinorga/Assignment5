import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { searchUrl } from '../endpoint';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  search: string;
  page: number;
  movies: Movie[];
  hasMore: boolean;
  endpoint: string;
  minError: boolean;
  inputError: boolean;
  constructor() {
    this.search = "";
    this.endpoint = searchUrl;
    this.initDefaultValues();
    this.minError = false;
    this.inputError = false;
  }

  initDefaultValues() {
    this.page = 1;
    this.movies = [];
    this.hasMore = false;
  }

  searchMovie(event: Event, input: HTMLInputElement) {
    event.preventDefault();
    this.search = input.value;
    //if (this.search.length < 3) {
    // this.minError = true;
    //  this.initDefaultValues();
    // } else {
    // this.minError = false;
    this.initDefaultValues();
    this.loadMovies();
    // }
  }

  loadMovies() {
    fetch(`${this.endpoint}&page=${this.page}&s=${this.search}`)
      .then(response => response.json())
      .then(data => data.Search ? this.setMovies(data.Search) : this.page === 1 ? this.inputError = true : this.disableLoadMore());
  }

  setMovies(movies: Movie[]) {
    this.inputError = false;
    this.movies = this.movies.concat(movies);
    this.page++;
    this.hasMore = true;
  }

  disableLoadMore() {
    this.hasMore = false;
    this.inputError = false;
  }

  ngOnInit() {
  }

}
