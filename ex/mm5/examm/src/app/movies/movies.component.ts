import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { searchUrl } from '../endpoint';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  search: string;
  endpoint: string;
  minError: boolean;
  inputError: boolean;
  index: number;
  currentMovies: Movie[];
  allData: Movie[];
  numberOfPages:number;

  constructor(private moviesService: MoviesService) {
    this.search = "";
    this.endpoint = searchUrl;
    this.minError = false;
    this.inputError = false;
    this.initDefaultValues();
  }

  initDefaultValues() {
    this.currentMovies = [];
    this.allData = [];
    this.index = 0;
    this.numberOfPages = 0;
  }

  searchMovie(event: Event, input) {
    event.preventDefault();
    this.search = input.value;
    if (this.search.length < 3) {
      this.minError = true;
      this.initDefaultValues();
    } else {
      this.minError = false;
      this.initDefaultValues();
      this.loadMovies();
    }
  }
// לא לשכוח לשנות בסטייל css
  loadMovies() {
    this.moviesService.loadMovies(this.search)
    .then(data => {
        if (data.Search) {
          this.allData = data.Search;
          this.inputError = false;
          this.setMovies();
          this.setNumberOfPages();
        } else
          this.inputError = true;
      })
  }

  setNumberOfPages(){
    this.numberOfPages = Math.ceil(this.allData.length / 5);
  }

  setMovies() {
    const step = 5;
    let begin = this.index * step;
    let end = begin + step;
      for (let i = begin; i < end; i++) {
        if (this.allData[i])
          this.currentMovies.push(this.allData[i]);
      }
  }

  nextPage() {
    this.index++;
    this.setMovies();
  }



  /*
  searchMovie(event: Event, input) {
    event.preventDefault();
    this.search = input.value;
    if (this.search.length < 3) {
      this.minError = true;
      this.initDefaultValues();
    } else {
      this.minError = false;
      this.initDefaultValues();
      this.loadMovies(); רק בשביל להכניס את המידע למערך
      this.searchInArr(this.search);
      setNumberOfPages();
      setMovies();
    }
  }

  searchInArr(searchKeywords: string) {
    this.messagesSearched = [];
    for (let m of this.allData) {
      if (m.message.includes(searchKeywords)) { האם בתוך המערך בהודעה האם יש את המילה שחיפשנו 
        this.messagesSearched.push(m);
      }
    }
  }
  */
  ngOnInit() {
  }

}
