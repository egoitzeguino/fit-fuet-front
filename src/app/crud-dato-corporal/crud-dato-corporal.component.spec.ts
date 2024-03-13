import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDatoCorporalComponent } from './crud-dato-corporal.component';

describe('CrudDatoCorporalComponent', () => {
  let component: CrudDatoCorporalComponent;
  let fixture: ComponentFixture<CrudDatoCorporalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudDatoCorporalComponent]
    });
    fixture = TestBed.createComponent(CrudDatoCorporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
