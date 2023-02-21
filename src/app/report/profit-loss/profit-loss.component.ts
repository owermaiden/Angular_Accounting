import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit {
  profitLossData: Map<string, number> = new Map<string, number>();

  constructor(private reportService: ReportService){}

  ngOnInit(): void {
    this.reportService.fetchProfitLossData().subscribe(
      response => {
        this.profitLossData = response
        console.log(response)
      }
    )
  }
}
