import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { BASE_ENDPOINT, TEXT_REGEXP } from "../constants";

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, public http: HttpClient) {
    this.createForm = this.formBuilder.group({
      category_id: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(100), this.nameValidator]],
      description: ['', [Validators.required, Validators.maxLength(500), this.descriptionValidator]],
      urgencyId: ['', Validators.required],
      desiredResolutionDate: ['', [Validators.required, this.dateValidator]],
      attachment: [''],
      comment: ['']
    });
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const isValid = TEXT_REGEXP.test(control.value);
    console.log('Name Validation:', isValid);
    return isValid ? null : { invalidName: true };
  }

  descriptionValidator(control: AbstractControl): ValidationErrors | null {
    const isValid = TEXT_REGEXP.test(control.value);
    console.log('Description Validation:', isValid);
    return isValid ? null : { invalidDescription: true };
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      const isValid = selectedDate >= currentDate;
      console.log('Date Validation:', isValid, ' format should be DD/MM/YY');
      return isValid ? null : { invalidDate: true };
    }
    return { invalidDate: true };
  }

  submitForm() {
    const userEmail=localStorage.getItem("userEmail");

      if (this.createForm.valid && userEmail) {
        const ticketDTO: any = { ...this.createForm.value };

        this.http.post(BASE_ENDPOINT+"/create", ticketDTO, {
          params: { userEmail }
        }).subscribe(
          (res: any) => {
            this.router.navigate(['/dashboard']);
          },
          (error: any) => {
            console.log("Error post request " + error);
          }
        );
      } else {
        console.log('Form is filled incorrectly.');
    }
  }

}
