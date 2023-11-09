import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketId: string = '';
  ticketData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.ticketId = id;
        this.loadTicketData(id);
      }
    });
  }

  loadTicketData(id: string) {
    this.http.get(`http://localhost:8080/api/v1/ticket/${id}`).subscribe((res: any) => {
      this.ticketData = res;
      console.log(this.ticketData);
    });
  }
}
