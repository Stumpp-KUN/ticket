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
  historyData: any[] = [];
  commentsData: any[] = [];
  activeTab: string | undefined = 'history';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  setActiveButton(button: string) {
    this.activeTab = button;
    if(this.activeTab=='history')
      this.loadHistory();
    else this.loadComments()
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.ticketId = id;
        this.loadTicketData(id);
        this.loadHistory();
      }
    });
  }

  loadTicketData(id: string) {
    this.http.get(`http://localhost:8080/api/v1/ticket/${id}`).subscribe((res: any) => {
      this.ticketData = res;
      console.log(this.ticketData);
    });
  }

  loadHistory() {
    this.http.get(`http://localhost:8080/api/v1/ticket/history/collect/${this.ticketId}`).subscribe((res: any) => {
      this.historyData = res;
      console.log(this.historyData);
    });
  }

  loadComments() {
    this.http.get(`http://localhost:8080/api/v1/ticket/comment/collect/${this.ticketId}`).subscribe((res: any) => {
      this.commentsData = res;
      console.log(this.commentsData);
    });
  }

}
