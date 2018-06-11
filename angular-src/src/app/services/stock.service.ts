import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

@Injectable()
export class StockService {

  stocks: Rx.Subject<any>;
  authToken: any;
  user: any;

  constructor(
    private http: Http,
    private wsService: WebsocketService
  ) {
    this.stocks = <Rx.Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        console.log('stock.service',response)
        return response;
      })
  }

  sendMsg(msg) {
    console.log('yoyo', msg);
    this.stocks.next(msg);
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getStocks() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/stocks/stocks', {headers: headers}).map(res => res.json());
  }

  getStockHistory(stockId) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/stocks/stocks/' + stockId, {headers: headers}).map(res => res.json());
  }

  addStock(stock) {
    let headers = new Headers();
    this.loadToken();
    this.stocks.next(stock);
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/stocks/add-stock', stock, {headers: headers}).map(res => res.json());
  }

  updateStock(stockId, newStockValue) {
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/stocks/update-stock/' + stockId , newStockValue, {headers: headers}).map(res => res.json());
  }

  deleteStock(stockId) {
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/stocks/delete-stock/' + stockId, {headers: headers}).map(res => res.json());
  }

}
