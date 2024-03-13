import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoDatosCorporalesComponent } from './historico-datos-corporales.component';

describe('HistoricoDatosCorporalesComponent', () => {
  let component: HistoricoDatosCorporalesComponent;
  let fixture: ComponentFixture<HistoricoDatosCorporalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoDatosCorporalesComponent]
    });
    fixture = TestBed.createComponent(HistoricoDatosCorporalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
