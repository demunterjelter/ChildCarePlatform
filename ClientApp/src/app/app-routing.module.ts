import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BabySittersComponent } from './baby-sitters/baby-sitters.component';
import { BabySitterComponent } from './baby-sitter/baby-sitter.component';
import { BabySitterAddEditComponent } from './baby-sitter-add-edit/baby-sitter-add-edit.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChildAddEditComponent } from './child-add-edit/child-add-edit.component';

const routes: Routes = [
  { path: '', component: CalendarComponent, pathMatch: 'full' },
  { path: 'babysitters', component: BabySittersComponent},
  { path: 'babysitter/:id', component: BabySitterComponent},
  { path: 'add/babysitter', component: BabySitterAddEditComponent},
  { path: 'babysitter/edit/:id', component: BabySitterAddEditComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'customer/:id', component: CustomerComponent},
  { path: 'add/customer', component: CustomerAddEditComponent},
  { path: 'customer/edit/:id', component: CustomerAddEditComponent},
  { path: 'add/child', component: ChildAddEditComponent},
  { path: 'child/edit/:id', component: ChildAddEditComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
