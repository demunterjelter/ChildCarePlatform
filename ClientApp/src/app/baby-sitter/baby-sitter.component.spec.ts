import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabySitterComponent } from './baby-sitter.component';

describe('BabySitterComponent', () => {
  let component: BabySitterComponent;
  let fixture: ComponentFixture<BabySitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabySitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabySitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
