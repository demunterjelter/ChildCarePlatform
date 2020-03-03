import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChildService } from '../services/child.service';
import { Child } from '../models/child';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-child-add-edit',
  templateUrl: './child-add-edit.component.html',
  styleUrls: ['./child-add-edit.component.scss']
})
export class ChildAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  Id: number;
  errorMessage: any;

  existingChild: Child;
  formChildName: string;
  formChildDate: string;
  formChildGender: string;
  formChildComment: string;

  message: string;




  // tslint:disable-next-line: max-line-length
  constructor(private childService: ChildService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router, private sharedService: SharedService) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formChildName = 'childname';
    this.formChildDate = 'dateofbirth';
    this.formChildGender = 'gender';
    this.formChildComment = 'commentchild';


    if (this.avRoute.snapshot.params[idParam]) {
      this.Id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group (
      {
        Id: 0,
        childname: ['', [Validators.required]],
        dateofbirth: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        commentchild: ['', [Validators.required]]
      }
    );

  }

  ngOnInit() {

    this.sharedService.sharedMessage.subscribe(message => this.message = message);

    if (this.Id > 0) {
      this.actionType = 'Edit';
      this.childService.getChild(this.Id)
        .subscribe(data => (
          this.existingChild = data,
          this.form.controls[this.formChildName].setValue(data.name),
          this.form.controls[this.formChildDate].setValue(data.dateOfBirth),
          this.form.controls[this.formChildGender].setValue(data.gender),
          this.form.controls[this.formChildComment].setValue(data.comment)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      const child: Child = {
        name: this.form.get(this.formChildName).value,
        dateOfBirth: this.form.get(this.formChildDate).value,
        gender: this.form.get(this.formChildGender).value,
        comment: this.form.get(this.formChildComment).value,
        customerId: this.message// this.form.get(this.formChildCustomer).value
      };

      this.childService.saveChild(child)
        .subscribe(data => {
          this.router.navigate(['/customer/', this.message]);
        });

    }

    if (this.actionType === 'Edit') {
      const child: Child = {
        id: this.existingChild.id,
        name: this.form.get(this.formChildName).value,
        dateOfBirth: this.form.get(this.formChildDate).value,
        gender: this.form.get(this.formChildGender).value,
        comment: this.form.get(this.formChildComment).value,
        customerId: this.message // this.form.get(this.formChildCustomer).value
      };

      this.childService.updateChild(child.id, child)
        .subscribe(data => {
          this.router.navigate(['/customer/', this.message]);
        });

    }

  }

  cancel() {
    this.router.navigate(['/customer/', this.message]);
  }

  get childname() { return this.form.get(this.formChildName); }
  get dateofbirth() { return this.form.get(this.formChildDate); }
  get gender() { return this.form.get(this.formChildGender); }
  get commentchild() {return this.form.get(this.formChildComment); }

}
