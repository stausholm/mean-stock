import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stockName: String;
  stockValue: Number;

  constructor(
    private stockService: StockService,
    private authService: AuthService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onStockSubmit() {
    const stock = {
      stockName: this.stockName,
      stockValue: this.stockValue
    }

    this.stockService.addStock(stock).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Your stock was added', { cssClass: 'alert-success', timeout: 3000 })
        this.stockService.sendMsg(stock);
      } else {
        this.flashMessages.show('Could not add stock', { cssClass: 'alert-danger', timeout: 3000 })
      }
    });
  }

  // sendMessage() {
  //   this.stockService.sendMsg("Test Message");
  // }
}
