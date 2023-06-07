import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private route:Router){}

  loginHandle(){
    this.route.navigate(['/login']);
  }
  signupHandle(){
    this.route.navigate(['/register']);
  }

}
