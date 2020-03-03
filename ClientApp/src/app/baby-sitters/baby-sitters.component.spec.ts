import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabySittersComponent } from './baby-sitters.component';

describe('BabySittersComponent', () => {
  let component: BabySittersComponent;
  let fixture: ComponentFixture<BabySittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabySittersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabySittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
