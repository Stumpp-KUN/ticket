import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_ENDPOINT} from "../constants";

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class TicketReview implements OnInit {
  tickets: any[] = [];
  userEmail: string | null = null;
  userRole: string | null = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
    this.userEmail = localStorage.getItem('userEmail');

    if (this.userRole !== null && this.userEmail !== null) {
      switch (this.userRole) {
        case 'EMPLOYEE':
          this.loadEmployeeTickets(this.userEmail);
          break;

        case 'MANAGER':
          this.loadManagerTickets(this.userEmail);
          break;

        case 'ENGINEER':
          this.loadEngineerTickets();
          break;

        default:
          break;
      }
    }
  }


  loadEmployeeTickets(userEmail: string) {
    const apiUrl = BASE_ENDPOINT + `/review/employee?userEmail=${userEmail}`;

    this.http.get(apiUrl).subscribe((res: any) => {
      this.tickets = res;
    });
  }

  loadManagerTickets(userEmail: string) {
    const apiUrl = BASE_ENDPOINT + `/review/manager?userEmail=${userEmail}`;

    this.http.get(apiUrl).subscribe((res: any) => {
      this.tickets = res;
    });
  }

  loadEngineerTickets() {
    const apiUrl = BASE_ENDPOINT + `/review/engineer`;

    this.http.get(apiUrl).subscribe((res: any) => {
      this.tickets = res;
    });
  }

  handleStateAction(ticket: any, state: string) {
    const apiUrl = BASE_ENDPOINT+`/update/state?state=${state}&userEmail=${this.userEmail}`;

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
    if (state === 'Assign') {
      this.http.put(BASE_ENDPOINT + `/update/assign?userEmail=${this.userEmail}`, ticket).subscribe(
        (res: any) => {
          console.log(res);
        },
        (error: any) => {
          console.log("Error put request " + error)
        }
      );
    } else {
      const apiUrl = BASE_ENDPOINT + `/update/state?state=${state}&userEmail=${this.userEmail}`;

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
