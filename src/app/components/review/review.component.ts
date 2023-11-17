// review.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class TicketReview implements OnInit {
  tickets: any[] = [];
  userEmail: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userRole = localStorage.getItem('role');
    this.userEmail = localStorage.getItem('userEmail');

    if(userRole === 'EMPLOYEE' && this.userEmail !==null){
      this.loadEmployeeTickets(this.userEmail);
    }

    if (userRole === 'MANAGER' && this.userEmail !== null) {
      this.loadManagerTickets(this.userEmail);
    }
    if (userRole === 'ENGINEER' && this.userEmail !== null) {
      this.loadEngineerTickets();
    }
  }

  loadEmployeeTickets(userEmail: string){
    const apiUrl = `http://localhost:8080/api/v1/ticket/review/employee?userEmail=${userEmail}`;

    this.http.get(apiUrl).subscribe((res: any) => {
      this.tickets = res;
    });
  }

  loadManagerTickets(userEmail: string) {
    const apiUrl = `http://localhost:8080/api/v1/ticket/review/manager?userEmail=${userEmail}`;

    this.http.get(apiUrl).subscribe((res: any) => {
      this.tickets = res;
    });
  }

  loadEngineerTickets() {
    const apiUrl = `http://localhost:8080/api/v1/ticket/review/engineer`;

    this.http.get(apiUrl).subscribe((res: any) => {
      this.tickets = res;
    });
  }

  handleStateAction(ticket: any, state: string) {
    const apiUrl = `http://localhost:8080/api/v1/ticket/update/state?state=${state}&userEmail=${this.userEmail}`;

    this.http.put(apiUrl, ticket).subscribe(
      (res: any) => {
        console.log(res);


      },
      (error: any) => {
        console.log("Error post request " + error);
      }
    );

  }

  handleEngineerAction(ticket: any, state: string) {
    if(state==='Assign'){
      this.http.put(`http://localhost:8080/api/v1/ticket/update/assign?userEmail=${this.userEmail}`,ticket).subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          console.log("Error put request " + error)
        }
      );
    }
    else {
      const apiUrl = `http://localhost:8080/api/v1/ticket/update/state?state=${state}&userEmail=${this.userEmail}`;

      this.http.put(apiUrl, ticket).subscribe(
        (res: any) => {
          console.log(res);

        },
        (error: any) => {
          console.log("Error put request " + error);
        }
      );
    }
  }


  protected readonly localStorage = localStorage;
}
