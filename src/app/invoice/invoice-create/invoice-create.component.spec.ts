import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceCreateComponent } from './invoice-create.component';

describe('PurchaseInvoiceCreateComponent', () => {
  let component: PurchaseInvoiceCreateComponent;
  let fixture: ComponentFixture<PurchaseInvoiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInvoiceCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInvoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
