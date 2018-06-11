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

  constructor(
    private authservice: AuthService,
    private stockservice: StockService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authservice.loggedIn();
    this.newValue = this.stockitem.stockHistory[this.stockitem.stockHistory.length -1].stockValue;
  }

  deleteStock(stockId) {
    this.stockservice.deleteStock(stockId).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Your stock was deleted!', { cssClass: 'alert-success', timeout: 3000 })
      } else {
        this.flashMessages.show('Deleting stock went wrong!', { cssClass: 'alert-danger', timeout: 3000 })
      }
    })
  }

  updateStock(stock) {

    this.stockservice.updateStock(this.stockitem._id, {"stockValue":this.newValue}).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('Your stock was updated!', { cssClass: 'alert-success', timeout: 3000 })
      } else {
        this.flashMessages.show('Updating stock went wrong!', { cssClass: 'alert-danger', timeout: 3000 })
      }
    })
  }

}
