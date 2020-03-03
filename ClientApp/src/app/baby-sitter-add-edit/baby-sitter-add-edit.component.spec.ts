import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabySitterAddEditComponent } from './baby-sitter-add-edit.component';

describe('BabySitterAddEditComponent', () => {
  let component: BabySitterAddEditComponent;
  let fixture: ComponentFixture<BabySitterAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabySitterAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabySitterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
