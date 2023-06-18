import { Component } from '@angular/core';
import { AuthapiService } from '../apiService/authapi.service';

@Component({
  selector: 'app-stream-data',
  templateUrl: './stream-data.component.html',
  styleUrls: ['./stream-data.component.css']
})
export class StreamDataComponent {
  messages: any[]|any;

  constructor(private authapi: AuthapiService) { }

  ngOnInit() {
    this.loadStreamData();
    // Refresh the data every few seconds
    // setInterval(() => {
    //   this.loadStreamData();
    // }, 5000);
  }
   loadStreamData(){
    this.authapi.fetchMessages().subscribe(data=>{
      this.messages = data;
      console.log(data);
    })
   }

   deleteMessages(){
    this.authapi.deleteKafkaData().subscribe(data=>{
      console.log(data);
    })
   }
}
