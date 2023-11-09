import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, public http: HttpClient) {
    this.createForm = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(100), this.nameValidator]],
      description: ['', [Validators.required, Validators.maxLength(500), this.descriptionValidator]],
      urgency: ['', Validators.required],
      desiredDate: ['', [Validators.required, this.dateValidator]],
      attachment: [''],
      comment: ['']
    });
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const pattern = /^[a-zA-Z0-9 .,"()<>@[\]!#$%&'*+-/=?^_`{|-]+$/;
    const isValid = pattern.test(control.value);
    console.log('Name Validation:', isValid);
    return isValid ? null : { invalidName: true };
  }

  descriptionValidator(control: AbstractControl): ValidationErrors | null {
    const pattern = /^[a-zA-Z0-9 .,"()<>@[\]!#$%&'*+-/=?^_`{|-]+$/;
    const isValid = pattern.test(control.value);
    console.log('Description Validation:', isValid);
    return isValid ? null : { invalidDescription: true };
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (datePattern.test(control.value)) {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      const isValid = selectedDate >= currentDate;
      console.log('Date Validation:', isValid, ' format should be DD/MM/YY');
      return isValid ? null : { invalidDate: true };
    }
    return { invalidDate: true };
  }

  submitForm() {
    console.log(this.createForm.value); // Проверьте значения полей в консоли перед отправкой
    if (this.createForm.valid) {

      this.http.post("http://localhost:8080/api/v1/ticket/create", this.createForm.value).subscribe((res:any) => {
        console.log(res);
      }, (error:any)=>{
        console.log("Error post request "+error);
      });
      this.router.navigate(['/dashboard']);
    } else {
      // Если форма недопустима, выполните необходимые действия,
      // например, отобразите сообщение об ошибке
      console.log('Форма заполнена некорректно.');
    }
  }
}
