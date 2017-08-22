import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonificacionDivComponent } from './bonificacion_div.component';

describe('BonificacionComponent', () => {
  let component: BonificacionDivComponent;
  let fixture: ComponentFixture<BonificacionDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonificacionDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonificacionDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
