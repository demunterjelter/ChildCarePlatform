import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BabySittersComponent } from './baby-sitters/baby-sitters.component';
import { BabySitterComponent } from './baby-sitter/baby-sitter.component';
import { BabySitterAddEditComponent } from './baby-sitter-add-edit/baby-sitter-add-edit.component';
import { BabySitterService } from './services/baby-sitter.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';
import { CustomerService } from './services/customer.service';
import { CalendarComponent } from './calendar/calendar.component';
import { ChildAddEditComponent } from './child-add-edit/child-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BabySittersComponent,
    BabySitterComponent,
    BabySitterAddEditComponent,
    CustomersComponent,
    CustomerComponent,
    CustomerAddEditComponent,
    CalendarComponent,
    ChildAddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    BabySitterService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
