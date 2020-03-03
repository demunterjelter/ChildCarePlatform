import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BabySitterService } from '../services/baby-sitter.service';
import { BabySitter } from '../models/BabySitter';


@Component({
  selector: 'app-baby-sitter-add-edit',
  templateUrl: './baby-sitter-add-edit.component.html',
  styleUrls: ['./baby-sitter-add-edit.component.scss']
})
export class BabySitterAddEditComponent implements OnInit {
    form: FormGroup;
    actionType: string;
    formName: string;
    formLastName: string;
    formPhoneNumber: string;
    formAge: string;
    Id: number;
    errorMessage: any;
    existingBabySitter: BabySitter;


  // tslint:disable-next-line: max-line-length
  constructor(private babySitterService: BabySitterService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
                const idParam = 'id';
                this.actionType = 'Add';
                this.formName = 'name';
                this.formLastName = 'lastname';
                this.formPhoneNumber = 'phonenumber';
                this.formAge = 'age';

                if (this.avRoute.snapshot.params[idParam]) {
                  this.Id = this.avRoute.snapshot.params[idParam];
                }

                this.form = this.formBuilder.group (
                  {
                    Id: 0,
                    name: ['', [Validators.required]],
                    lastname: ['', [Validators.required]],
                    phonenumber: ['', [Validators.required]],
                    age: ['', [Validators.required]],
                  }
                );

              }

  ngOnInit() {

    if (this.Id > 0) {
      this.actionType = 'Edit';
      this.babySitterService.getBabySitter(this.Id)
        .subscribe(data => (
          console.log(this.Id),
          this.existingBabySitter = data,
          console.log(data),
          console.log(this.existingBabySitter.id),
          this.form.controls[this.formName].setValue(data.name),
          this.form.controls[this.formLastName].setValue(data.lastName),
          this.form.controls[this.formPhoneNumber].setValue(data.phoneNumber),
          this.form.controls[this.formAge].setValue(data.age)
        ));
    }
  }

  save() {
      if (!this.form.valid) {
        return;
      }

      if (this.actionType === 'Add') {
        const babySitter: BabySitter = {
          name: this.form.get(this.formName).value,
          lastName: this.form.get(this.formLastName).value,
          phoneNumber: this.form.get(this.formPhoneNumber).value,
          age: this.form.get(this.formAge).value,
          customers: null
        };

        this.babySitterService.saveBabySitter(babySitter)
          .subscribe((data) => {
           this.router.navigate(['/babysitters']);
          });

      }

      if (this.actionType === 'Edit') {
        const babysitter: BabySitter = {
          id: this.existingBabySitter.id,
          name: this.form.get(this.formName).value,
          lastName: this.form.get(this.formLastName).value,
          phoneNumber: this.form.get(this.formPhoneNumber).value,
          age: this.form.get(this.formAge).value,
          customers: null
        };

        this.babySitterService.updateBabySitter(babysitter.id, babysitter)
          .subscribe((data) => {
            this.router.navigate(['/babysitters']);
          });
      }

    }

    cancel() {
      this.router.navigate(['/babysitters']);
    }

    get name() { return this.form.get(this.formName); }
    get lastname() { return this.form.get(this.formLastName); }
    get phonenumber() { return this.form.get(this.formPhoneNumber); }
    get age() { return this.form.get(this.formAge); }

}
