import { Component } from '@angular/core';
import { UtilityService } from '../apiService/utility.service';
import { AuthapiService } from '../apiService/authapi.service';
import { TicketData } from '../model/ticket-data';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent {

  transactionData:TicketData|any;

  finalToken = this.authService.getUserToken();

  constructor(private utilService:UtilityService,private authService:AuthapiService){}

  ngOnInit():void{
    this.utilService.getTransaction('TXN-2023061100454952491',this.finalToken).subscribe(res=>{
      console.log(res);
      this.transactionData = res;
    },err=>{
      console.log(err);
    })
  }

}
