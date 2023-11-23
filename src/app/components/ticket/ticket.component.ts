import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BASE_ENDPOINT, HISTORY_ENDPOINT, USER_ENDPOINT} from "../constants";

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

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  setActiveButton(button: string) {
    this.activeTab = button;
    if (this.activeTab == 'history')
      this.loadHistoryWithUserDetails();
    else this.loadComments()
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.ticketId = id;
        this.loadTicketData(id);
        this.loadHistoryWithUserDetails();
      }
    });
  }

  loadTicketData(id: string) {
    this.http.get(BASE_ENDPOINT + `/${id}`).subscribe((res: any) => {
      this.ticketData = res;
      console.log(this.ticketData);
    });
  }

  loadHistoryWithUserDetails() {
    this.http.get(HISTORY_ENDPOINT + `/collect/${this.ticketId}`).subscribe((res: any) => {
      this.historyData = res;
      this.loadUserDetailsForHistory();
    });
  }

  loadUserDetailsForHistory() {
    this.historyData.forEach(historyItem => {
      this.loadUserDetails(historyItem.userId).subscribe((userDetails: any) => {
        historyItem.user = userDetails;
      });
    });
  }

  loadUserDetails(userId: string) {
    return this.http.get(USER_ENDPOINT + `/${userId}`);
  }

  loadComments() {
    this.http.get(BASE_ENDPOINT+`/comment/collect/${this.ticketId}`).subscribe((res: any) => {
      this.commentsData = res;
      console.log(this.commentsData);
    });
  }

}
