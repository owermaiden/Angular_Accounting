import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/common/currency';
import { Invoice } from 'src/app/common/invoice';
import { DashboardService } from 'src/app/services/dashboard.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  exchangeRates: Currency = new Currency();
  lastThreeInvoices: Invoice[] = [];
  totalCost: number = 0;
  totalSales: number = 0;
  profitLoss: number = 0;

  constructor(private dashboardService: DashboardService,
              private invoiceService: InvoiceService){}

  ngOnInit(): void {
      this.invoiceService.fetchLastThree().subscribe(
        response => this.lastThreeInvoices = response
      );
    
      this.dashboardService.fetchEchangeData().subscribe(
        response => this.exchangeRates = response
      );

      this.dashboardService.fetchSummaryNumbers().subscribe(
        response => {
          this.totalSales = Object.values(response)[0];
          this.totalCost = Object.values(response)[2];
          this.profitLoss = Object.values(response)[1];
        }
      );
  }

}
