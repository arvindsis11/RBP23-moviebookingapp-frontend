import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthapiService } from '../apiService/authapi.service';
import { ResponseData } from '../model/response-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{
  users!: ResponseData[];
  selectedMovie: any;
  loading = true;//loading


  dataSource = new MatTableDataSource<ResponseData>([]);
  finalToken = this.authService.getUserToken();
  userId: string | any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private authService:AuthapiService){}
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'password',
    'securityQuestion',
    'securityAnswer',
    'roles'
  ];
  ngOnInit(): void {
    this.loadUsersList();
  }

  loadUsersList(){
    this.authService.getUsersList().subscribe(data=>{
      // console.log(data);
      this.users = data;
      this.updateDataSource();
      this.loading = false;
    },err=>{
      console.log(err);
    })
  }

  updateDataSource() {
    this.dataSource.data = this.users;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
