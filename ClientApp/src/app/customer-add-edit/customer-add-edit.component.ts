import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';


@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formName: string;
  formAddress: string;
  formMail: string;
  formPhoneNumber: string;
  formComment: string;
  Id: number;
  errorMessage: any;
  existingCustomer: Customer;

   // tslint:disable-next-line: max-line-length
  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
                const idParam = 'id';
                this.actionType = 'Add';
                this.formName = 'name';
                this.formAddress = 'address';
                this.formMail = 'mail';
                this.formPhoneNumber = 'phonenumber';
                this.formComment = 'comment';

                if (this.avRoute.snapshot.params[idParam]) {
                  this.Id = this.avRoute.snapshot.params[idParam];
                }

                this.form = this.formBuilder.group (
                  {
                    Id: 0,
                    name: ['', [Validators.required]],
                    address: ['', [Validators.required]],
                    mail: ['', [Validators.email, Validators.required]],
                    phonenumber: ['', [Validators.required]],
                    comment: ['', [Validators.required]]
                  }
                );
   }

  ngOnInit() {
    if (this.Id > 0) {
      this.actionType = 'Edit';
      this.customerService.getCustomer(this.Id)
        .subscribe(data => (
          console.log(this.Id),
          this.existingCustomer = data,
          console.log(data),
          console.log(this.existingCustomer.id),
          this.form.controls[this.formName].setValue(data.name),
          this.form.controls[this.formAddress].setValue(data.address),
          this.form.controls[this.formMail].setValue(data.mail),
          this.form.controls[this.formPhoneNumber].setValue(data.phoneNumber),
          this.form.controls[this.formComment].setValue(data.comment)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      const customer: Customer = {
        name: this.form.get(this.formName).value,
        address: this.form.get(this.formAddress).value,
        mail: this.form.get(this.formMail).value,
        phoneNumber: this.form.get(this.formPhoneNumber).value,
        comment: this.form.get(this.formComment).value
      };

      this.customerService.saveCustomer(customer)
        .subscribe(data => {
          this.router.navigate(['/customers']);
        });

    }

    if (this.actionType === 'Edit') {
      const customer: Customer = {
        id: this.existingCustomer.id,
        name: this.form.get(this.formName).value,
        address: this.form.get(this.formAddress).value,
        mail: this.form.get(this.formMail).value,
        phoneNumber: this.form.get(this.formPhoneNumber).value,
        comment: this.form.get(this.formComment).value
      };

      this.customerService.updateCustomer(customer.id, customer)
        .subscribe(data => {
          this.router.navigate(['/customers']);
        });

    }

  }

  cancel() {
    this.router.navigate(['/customers']);
  }

  get name() { return this.form.get(this.formName); }
  get address() {return this.form.get(this.formAddress); }
  get mail() {return this.form.get(this.formMail); }
  get phonenumber() { return this.form.get(this.formPhoneNumber); }
  get comment() {return this.form.get(this.formComment); }

}
