import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StockService } from '../../services/stock.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {
  @Input() stockitem:{
    _id:String,
    stockHistory:[{
      stockValue:Number
    }],
  };
  @Input() index:String;
  isLoggedIn: Boolean;
  newValue:Number;
  direction: String;
  directionClass: String;

  constructor(
    private authservice: AuthService,
    private stockservice: StockService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authservice.loggedIn();
    this.newValue = this.stockitem.stockHistory[this.stockitem.stockHistory.length -1].stockValue;

    if(this.stockitem.stockHistory.length > 1) {
      let latest = this.stockitem.stockHistory[this.stockitem.stockHistory.length -1].stockValue;
      let secondLatest = this.stockitem.stockHistory[this.stockitem.stockHistory.length -2].stockValue;

      if(latest > secondLatest) {
        this.direction = "Up from " + secondLatest;
        this.directionClass = "up";
      } else {
        this.direction = "Down from " + secondLatest;
        this.directionClass = "down";
      }
    } else {
      this.direction = "No value changes";
      this.directionClass = "default";
    } 
  }

  deleteStock(stockId) {
    this.stockservice.deleteStock(stockId).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Your stock was deleted!', { cssClass: 'alert-success', timeout: 3000 })
        this.stockservice.sendMsg(this.stockitem);
      } else {
        this.flashMessages.show('Deleting stock went wrong!', { cssClass: 'alert-danger', timeout: 3000 })
      }
    })
  }

  updateStock(stock) {

    this.stockservice.updateStock(this.stockitem._id, {"stockValue":this.newValue}).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Your stock was updated!', { cssClass: 'alert-success', timeout: 3000 })
        this.stockservice.sendMsg(this.stockitem);
      } else {
        this.flashMessages.show('Updating stock went wrong!', { cssClass: 'alert-danger', timeout: 3000 })
      }
    })
  }

}
