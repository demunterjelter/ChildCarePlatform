import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { ChildService } from '../services/child.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customer$: Observable<Customer>;
  id: number;

  message: string;

  // tslint:disable-next-line: max-line-length
  constructor(private customerService: CustomerService, private avRoute: ActivatedRoute, private childService: ChildService, private sharedService: SharedService) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
   }

  ngOnInit() {
    this.loadCustomer();
    this.sharedService.sharedMessage.subscribe(message => this.message = message);
    this.newMessage();
  }

  newMessage() {
    this.sharedService.nextMessage(this.id.toString());
  }

  loadCustomer() {
    this.customer$ = this.customerService.getCustomer(this.id);
  }

  delete(id) {
    const ans = confirm('wil je volgend kind verwijderen met id: ' + id + '?');
    if (ans) {
      this.childService.deleteChild(id).subscribe((data) => {
        this.loadCustomer();
      });
    }
  }

}
