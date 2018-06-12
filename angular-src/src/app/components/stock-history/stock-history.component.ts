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
  stock: Object;
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

}
