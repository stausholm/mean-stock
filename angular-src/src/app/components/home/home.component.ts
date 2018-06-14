import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  stocks = [];
  isLoggedIn: Boolean;
  socket: any;

  constructor(
    private stockservice: StockService,
    private authservice: AuthService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authservice.loggedIn();

    // this.stockservice.stocks.subscribe(stock => {
    //   console.log(stock);
    //   this.stocks = stock;
    // })

    // this.stockservice.getStocks().subscribe(stocks => {
    //   this.stocks = stocks;
    //   console.log(stocks);
    // }, err => {
    //   console.log(err);
    //   return false
    // })
    this.getStocks();

    this.socket = io('http://localhost:3000');
    this.socket.on('Update', () => this.getStocks());
  }

  // sendMessage() {
  //   this.stockservice.sendMsg("Test Message");
  // }
  ngOnDestroy() {
    console.log('destroy called');
    this.socket.disconnect();
  }


  getStocks() {
    console.log('Subscribe to service');
    this.stockservice.getStocks()
      .subscribe(
        stocks => {
          console.log("Stocks home.component:",stocks);
          this.stocks = stocks;
        },
        error =>  console.log(error)
      );
  }
}
