import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { BASE_ENDPOINT} from "../constants";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tickets: any[] = [];
  activeButton: string = 'allTickets';
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
    const params = new HttpParams()
      .set('type', type.toString())
      .set('available', this.available.toString());

    this.http.get(BASE_ENDPOINT+`/collect`,{ params }).subscribe((res: any) => {
      this.tickets = res;
      console.log(this.tickets);
    });
  }

  sortTicketsByType(type: number) {
    const params = new HttpParams()
      .set('type', type.toString())
      .set('available', this.available.toString());

    this.http.get(BASE_ENDPOINT+`/collect`,{ params }).subscribe((res: any) => {
      this.tickets=res;

    });
  }

}
