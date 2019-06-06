import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie.model';
import { rootUrl } from '../endpoint';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;
  detailsUrl: string;
  movieDetails: string[];
  isDetailOpen: boolean;
  constructor() {
    this.detailsUrl = rootUrl;
    this.movieDetails = [];
    this.isDetailOpen = false;
  }

  showDetails(id: string) {
    fetch(`${this.detailsUrl}&i=${id}`)
      .then(response => response.json())
      .then(data => this.setDetails(data));
  }

  setDetails(data: object) {
    if (!this.isDetailOpen) {
      for (let detail in data) {
        if (detail === "Ratings") {
          this.movieDetails.push(`Ratings: `);
          this.addRatings(data[detail]);
        } else
          this.movieDetails.push(`${detail}: ${data[detail]}`);
      }
      this.isDetailOpen = true;
    } else {
      this.movieDetails = [];
      this.isDetailOpen = false;
    }
  }

  addRatings(arrRatings) {
    arrRatings.map(item => this.movieDetails.push(`Source: ${item.Source}, Value: ${item.Value} `))
  }

  ngOnInit() {
  }

}
