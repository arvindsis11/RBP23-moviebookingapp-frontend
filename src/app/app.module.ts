import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { BookMovieComponent } from './book-movie/book-movie.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ResetComponent } from './reset/reset.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CustomDatePipe } from './apiService/custom-date.pipe';
import { MatAlertComponent } from './mat-alert/mat-alert.component';
import { HomeComponent } from './home/home.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { StreamDataComponent } from './stream-data/stream-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ViewMoviesComponent,
    BookMovieComponent,
    ViewTicketsComponent,
    ResetComponent,
    NavbarComponent,
    UnauthorizedComponent,
    AddMovieComponent,
    MoviedetailsComponent,
    NotfoundComponent,
    DeleteDialogComponent,
    FooterComponent,
    ViewUsersComponent,
    CustomDatePipe,
    MatAlertComponent,
    HomeComponent,
    StreamDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,//remove me
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
