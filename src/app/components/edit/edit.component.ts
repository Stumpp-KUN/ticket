import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {BASE_ENDPOINT} from "../constants";

@Component({
  selector: "edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent {
  ticketId: string = "";
  ticketData: any;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      category_id: ["", Validators.required],
      name: ["", [Validators.required, Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      urgencyId: ["", Validators.required],
      desiredResolutionDate: ["", Validators.required],
      attachment: [""],
      comment: [""],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id !== null) {
        this.ticketId = id;
        this.loadTicketData(id);
      }
    });
  }

  loadTicketData(id: string) {
    this.http.get(BASE_ENDPOINT+`/${id}`).subscribe(
      (res: any) => {
        this.ticketData = res;
        this.editForm.patchValue({
          category_id: this.ticketData.category_id.name,
          name: this.ticketData.name,
          description: this.ticketData.description,
          urgencyId: this.ticketData.urgencyId,
          desiredResolutionDate: this.ticketData.desiredResolutionDate,
          attachment: this.ticketData.attachment,
          comment: this.ticketData.comment,
        });
      },
      (error) => {
        console.log("Error loading ticket data", error);
      }
    );
  }

  submitForm() {

  }
}
