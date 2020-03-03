import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAddEditComponent } from './child-add-edit.component';

describe('ChildAddEditComponent', () => {
  let component: ChildAddEditComponent;
  let fixture: ComponentFixture<ChildAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
