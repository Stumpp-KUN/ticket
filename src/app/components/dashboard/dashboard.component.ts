import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tickets: any[] = [];
  activeButton: string | undefined = 'allTickets';

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadTableData();
  }

  setActiveButton(button: string) {
    this.activeButton = button;
    this.loadTableData();
  }


  loadTableData() {
    let type: number = 1; // Assign a default value

    if (this.activeButton === 'allTickets') {
      type = 1;
    } else if (this.activeButton === 'myTickets') {
      type = 2;
    }

    this.tickets.splice(0, this.tickets.length);
    this.http.get(`http://localhost:8080/api/v1/ticket/collect?type=${type}`).subscribe((res: any) => {
      this.tickets = res;
      console.log(this.tickets);
    });
  }

}
