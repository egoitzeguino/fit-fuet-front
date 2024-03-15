import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionEjercicioComponent } from './descripcion-ejercicio.component';

describe('DescripcionEjercicioComponent', () => {
  let component: DescripcionEjercicioComponent;
  let fixture: ComponentFixture<DescripcionEjercicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescripcionEjercicioComponent]
    });
    fixture = TestBed.createComponent(DescripcionEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
