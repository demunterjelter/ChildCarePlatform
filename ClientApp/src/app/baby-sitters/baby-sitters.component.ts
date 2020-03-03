import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BabySitterService } from '../services/baby-sitter.service';
import { BabySitter } from '../models/BabySitter';


@Component({
  selector: 'app-baby-sitters',
  templateUrl: './baby-sitters.component.html',
  styleUrls: ['./baby-sitters.component.scss']
})
export class BabySittersComponent implements OnInit {

  babySitters$: Observable<BabySitter[]>;

  constructor(private babySitterService: BabySitterService) { }

  ngOnInit() {
    this.loadBabySitters();
  }

  loadBabySitters() {
    this.babySitters$ = this.babySitterService.getBabySitters();
  }

  delete(Id) {
    const ans = confirm('wil je de volgende babysitter verijderen met id: ' + Id) + '?';
    if (ans) {
      this.babySitterService.deleteBabySitter(Id).subscribe((data) => {
        this.loadBabySitters();
      });
    }
  }

}
