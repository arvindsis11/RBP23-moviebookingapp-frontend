import { Component } from '@angular/core';
import { AuthapiService } from '../apiService/authapi.service';

@Component({
  selector: 'app-stream-data',
  templateUrl: './stream-data.component.html',
  styleUrls: ['./stream-data.component.css']
})
export class StreamDataComponent {
  messages: any[]|any;
  loading:boolean = false;

  constructor(private authapi: AuthapiService) { }

  ngOnInit() {
    this.loading = true;
    this.loadStreamData();
  }
   loadStreamData(){
    this.loading = true;
    this.authapi.fetchMessages().subscribe(data=>{
      this.messages = data;
      console.log(data);
      this.loading = false;
    },err=>{
      console.log(err);
      this.loading = false;
    })
   }

   deleteMessages(){
    this.loading = true;
    this.authapi.deleteKafkaData().subscribe(data=>{
      console.log(data);
      this.loading = false;
      this.loadStreamData();
    },err=>{
      this.loading = true;
      console.log(err);
      this.loadStreamData();
    })
   }
}
