import { Injectable } from '@angular/core';
import { searchUrl } from '../endpoint';
import {Movie} from '../movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  endpoint: string;
  constructor() {
    this.endpoint = searchUrl;
   }

   loadMovies(search: string): Promise<Movie> {
    const url = `${this.endpoint}&s=${search}`;
    return fetch(url).then( response => response.json() )
  }
}
