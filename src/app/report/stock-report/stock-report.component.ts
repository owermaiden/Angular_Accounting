import { Component, OnInit } from '@angular/core';
import { InvoiceProduct } from 'src/app/common/invoice-product';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit{
  stockData: InvoiceProduct[] = [];
  

  constructor(private reportService: ReportService){}

  ngOnInit(): void {
      this.reportService.fetchStockData().subscribe(
        response => this.stockData = response
      )
      
  }


}
