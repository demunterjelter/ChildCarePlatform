import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  buttonDisabled = false;
  customers$: Observable<Customer[]>;
  disablebutton = [false];


  constructor(private customerService: CustomerService) {
   }

   setCustomerActive(index) {
    this.disablebutton[index] = true;
  }

  setNonCustomerActive(index) {
   this.disablebutton[index] = false;
  }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customers$ = this.customerService.getCustomers();
  }

  delete(id) {
    const ans = confirm('wil je de volgende klant verwijderen met id: ' + id + '?');
    if (ans) {
      this.customerService.deleteCustomer(id).subscribe((data) => {
        this.loadCustomers();
      });
    }
  }

}
