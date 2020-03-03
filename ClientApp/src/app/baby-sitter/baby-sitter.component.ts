import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BabySitterService } from '../services/baby-sitter.service';
import { BabySitter } from '../models/BabySitter';

@Component({
  selector: 'app-baby-sitter',
  templateUrl: './baby-sitter.component.html',
  styleUrls: ['./baby-sitter.component.scss']
})
export class BabySitterComponent implements OnInit {

  babySitter$: Observable<BabySitter>;
  Id: number;

  constructor(private babySitterService: BabySitterService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.Id = this.avRoute.snapshot.params[idParam];
    }
   }

  ngOnInit() {
    this.loadBabySitter();
  }

  loadBabySitter() {
    this.babySitter$ = this.babySitterService.getBabySitter(this.Id);
  }

}
