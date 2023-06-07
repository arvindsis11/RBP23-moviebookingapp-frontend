import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieapiService } from '../apiService/movieapi.service';
import { TicketData } from '../model/ticket-data';
import { AuthapiService } from '../apiService/authapi.service';
import { MovieData } from '../model/movie-data';
import { MatAlertComponent } from '../mat-alert/mat-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrls: ['./book-movie.component.css']
})
export class BookMovieComponent {
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  seats: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  seatNumbers: string[] = [];
  bookedSeats: string[] = [];
  selectedMovie:MovieData|any;
  bookingSuccess:boolean|null = null;
  loading:boolean = false;

  movieName:string|any;
  theaterName:string|any;
  movieId:string|any;
  bookingForm: FormGroup;

  errormsg:string|any;


 
  finalToken = this.authService.getUserToken();
  username:string|any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private movieService: MovieapiService, private authService: AuthapiService,private dialog:MatDialog) {
    this.bookingForm = this.fb.group({
      movieName: ['', Validators.required],
      theaterName: ['', Validators.required],
      numberOfTickets: [null,  [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    this.username= this.authService.getUsername();
    const bookingData: TicketData = {
      transactionId:'',//sending empty because will set it from backend
      seatNumbers: this.seatNumbers,
      numberOfTickets: this.bookingForm.controls['numberOfTickets'].value,
      movieName: this.bookingForm.controls['movieName'].value,
      theaterName: this.bookingForm.controls['theaterName'].value,
      userId:this.username//will take from local storage
    };
    //book the movie here--fix--prt-mid
    if (this.bookingForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    this.movieService.bookMovie(this.finalToken,this.movieName,bookingData).subscribe(res=>{
      console.log('check',res);
      this.bookingSuccess = true;
      this.loading = false;
      //window.location.reload();//fix me later
      this.openAlert(`successfully booked movie: ${this.movieName}`, true);
      this.bookingForm.reset();
    },err=>{
      this.bookingSuccess = false;
      this.loading = false;
      this.errormsg = err.error;
      console.log(this.errormsg);
      this.openAlert(this.errormsg, false);
    });
    console.log(bookingData);

  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       this.movieName = params['movieName'];
      this.theaterName = params['theaterName'];
      this.movieId = params['movieId'];
      console.log(params);
      this.bookingForm.setValue({//directly setting moviename and theaterName here
        movieName: this.movieName,
        theaterName: this.theaterName,
        numberOfTickets: this.bookingForm.controls['numberOfTickets'].value
      });
    });
    //it will search for movie by id and show booked seats in box
    this.movieService.getMovieById(this.finalToken,this.movieId).subscribe(data=>{
      console.log('movie searching....byid');
      console.log(data);
      this.selectedMovie = data;
      this.bookedSeats = [...data.bookedSeats];//insert into booked
      
    },err=>{
      console.log(err);
      this.openAlert(err.error,false);
    })
  }
  areSeatsSelected(): boolean {
    const numberOfTickets = this.bookingForm.controls['numberOfTickets'].value;
    return this.seatNumbers.length === numberOfTickets;
  }
  
  isSeatSelected(row: string, seat: string): boolean {
    return this.seatNumbers.indexOf(`${row}${seat}`) > -1;
  }

  isSeatBooked(row: string, seat: string): boolean {
    return this.bookedSeats.indexOf(`${row}${seat}`) > -1;
  }

  selectSeat(row: string, seat: string): void {
    const maxSeats = this.bookingForm.controls['numberOfTickets'].value;

  if (this.seatNumbers.length < maxSeats) {
    const seatNumber = `${row}${seat}`;
    
    if (!this.isSeatSelected(row, seat) && !this.isSeatBooked(row, seat)) {
      this.seatNumbers.push(seatNumber);
    } else if (this.isSeatSelected(row, seat)) {
      const index = this.seatNumbers.indexOf(seatNumber);
      this.seatNumbers.splice(index, 1);
    }
  } else if (this.seatNumbers.length === maxSeats) {
    const seatNumber = `${row}${seat}`;
    
    if (this.isSeatSelected(row, seat)) {
      const index = this.seatNumbers.indexOf(seatNumber);
      this.seatNumbers.splice(index, 1);
    } else {
      this.seatNumbers.splice(0, 1);//removing oldest selection and adding new one
      this.seatNumbers.push(seatNumber);
    }
  }
  }
  //check if ticket book is failed or success
  openAlert(message:string ,processSuccess: boolean): void {
    this.dialog.open(MatAlertComponent, {
      width: '300px',
      height:'300px',
      data: { message,processSuccess },
    });
  }

}
