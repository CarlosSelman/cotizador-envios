import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorRegionesComponent } from './cotizador-regiones.component';

describe('CotizadorRegionesComponent', () => {
  let component: CotizadorRegionesComponent;
  let fixture: ComponentFixture<CotizadorRegionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizadorRegionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadorRegionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
