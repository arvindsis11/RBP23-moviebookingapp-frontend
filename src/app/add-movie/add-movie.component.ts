import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthapiService } from '../apiService/authapi.service';
import { MovieapiService } from '../apiService/movieapi.service';
import { AddmovieData } from '../model/addmovie-data';
import { MatDialog } from '@angular/material/dialog';
import { MatAlertComponent } from '../mat-alert/mat-alert.component';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movieForm: FormGroup | any;
  addMovieSuccess: boolean | null = null;
  loading: boolean = false;
  finalToken = this.authService.getUserToken();
  constructor(private formBuilder: FormBuilder, private authService: AuthapiService, private movieService: MovieapiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      movieName: ['', Validators.required],
      theaterName: ['', Validators.required],
      ticketStatus: ['', Validators.required],
      totalTickets: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.movieForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    const formData = this.movieForm.value;
    console.log(formData);
    const status = this.movieForm.value.ticketStatus;
    console.log(status);
    const movieData: AddmovieData = {
      movieName: formData.movieName,
      theaterName: formData.theaterName,
      totalTickets: status === 'SOLD OUT' ? 0 : formData.totalTickets,
      ticketStatus: formData.ticketStatus,
    };
    this.movieService.addMovie(movieData, this.finalToken).subscribe(res => {
      console.log(res);
      this.addMovieSuccess = true;
      this.loading = false;
      this.openAlert(`movie ${res.movieName} added successfully`, true);//fix
      this.movieForm.reset();   // uncomment me
    }, err => {
      console.log(err);
      this.addMovieSuccess = false;
      this.loading = false;
      this.openAlert(`failed: ${err.error.text}`, false);
    });
  }
  //alert box for success or fail
  openAlert(message:string ,processSuccess: boolean): void {
    this.dialog.open(MatAlertComponent, {
      width: '300px',
      height:'300px',
      data: { message,processSuccess },
    });
  }


}
