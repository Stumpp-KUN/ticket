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
  userRole: string | null = null;
  available: Boolean = false;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadTableData();

    this.userRole = localStorage.getItem("role");
  }

  setActiveButton(button: string) {
    this.activeButton = button;
    this.loadTableData();
  }

  loadTableData() {
    let type: number = 1;

    if (this.activeButton === 'allTickets') {
      type = 1;
      this.available = true;
    } else if (this.activeButton === 'myTickets') {
      type = 2;
      this.available = false;
    }

    this.tickets.splice(0, this.tickets.length);
    this.http.get(`http://localhost:8080/api/v1/ticket/collect?type=${type}&available=${this.available}`).subscribe((res: any) => {
      this.tickets = res;
      console.log(this.tickets);
    });
  }

  sort(type: number) {
    const apiUrl = `http://localhost:8080/api/v1/ticket/collect?type=${type}&available=${this.available}`;

    this.http.get(apiUrl).subscribe((res:any) => {
      this.tickets=res;

    });
  }

}
