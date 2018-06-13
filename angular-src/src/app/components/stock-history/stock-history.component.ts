import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {
  stock: {
    stockHistory: [{
      stockValue: Number
    }]
  };
  params: String;

  constructor(
    private stockservice: StockService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.params = params.get('stockId');
    })
    
    this.getHistory();

    var socket = io('http://localhost:3000');
    socket.on('Update', () => this.getHistory());
  }
  
  getHistory() {
    this.stockservice.getStockHistory(this.params).subscribe(stock => {
      this.stock = stock;
      //this.stockservice.sendMsg(stock);
      console.log('getstockhistory',stock);
    }, err => {
      console.log(err);
      return false
    })
  }

  formatDate(date) {
    date = new Date(date);

    let monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
  
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + minutes;
  }
  

}
