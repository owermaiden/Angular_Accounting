import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceProductCreateComponent } from './invoice-product-create.component';

describe('InvoiceProductCreateComponent', () => {
  let component: InvoiceProductCreateComponent;
  let fixture: ComponentFixture<InvoiceProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceProductCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
