import { Component, ViewChild } from '@angular/core';
import { MovieapiService } from '../apiService/movieapi.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MovieData } from '../model/movie-data';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthapiService } from '../apiService/authapi.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent {
  movies!: MovieData[];
  username: string | any;
  dataSource = new MatTableDataSource<MovieData>([]);
  editMode = true;//for editing just a property
  finalToken = this.authService.getUserToken();
  isAdmin = false;
  loading = true; //page load


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private movieService: MovieapiService, private router: Router, private formBuilder: FormBuilder, private authService: AuthapiService, private dialog: MatDialog) { }


  displayedColumns: string[] = [
    'movieName',
    'theaterName',
    'bookedTickets',
    'availableTickets',
    'ticketStatus'
  ];

  selectedMovie: any;

  bookNow(movie: MovieData) {
    console.log('hello')
    //send this data to booking componen..t
    this.router.navigate(['/bookmovie'], { queryParams: { movieName: movie.movieName, movieId: movie.movieId, theaterName: movie.theaterName } });
  }
  // Admin actions
  deleteMovie(movie: MovieData) {
    console.log('Delete movie:', movie);
    this.openDialog(movie);
  }
  editMovie(movie: MovieData): void {
    console.log('Editing movie');
    this.editMode = !this.editMode;
    this.selectedMovie = movie;
  }

  confirmEdit(movie: MovieData): void {
    console.log('Confirming edit');
    console.log(movie);
    this.movieService.updateMovie(movie.movieName, movie, this.finalToken).subscribe((data) => {
      // console.log(data);
      this.loadMovieData();
    }, (err) => {
      console.log(err);
    })
    this.editMode = false;
    this.selectedMovie = '';
  }

  cancelEdit(movie: MovieData): void {
    console.log('Canceling edit');
    this.editMode = false;
    this.selectedMovie = '';
  }

  ngOnInit() {
    this.isAdmin = this.authService.isRoleAdmin();
    if (this.isAdmin) {
      this.displayedColumns.push('adminActions');
    }
    this.loadMovieData();
  }

  loadMovieData() {
    this.username = localStorage.getItem('username');
    this.movieService.getAllMovies(this.finalToken).subscribe(data => {
      // console.log(data);
      this.movies = data;
      this.movies.reverse();
      this.updateDataSource();
      this.loading = false
    })
  }

  updateDataSource() {
    this.dataSource.data = this.movies;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  viewDetails(movie: MovieData) {
    const movieId = movie.movieId;
    this.router.navigate(['/movie', movieId]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(movie: MovieData): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { movieName: movie.movieName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.movieService.deleteMovie(movie.movieId, this.finalToken).subscribe(res => {
          // console.log(res);
          this.loadMovieData();
        }, err => {
          this.loadMovieData();
          console.log(err);
        });
        // console.log(result);
      }
    });
  }
}

