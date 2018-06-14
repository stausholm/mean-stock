import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http'; 
import { StockService } from './stock.service';
import { WebsocketService } from './websocket.service';

describe('StockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService, WebsocketService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([StockService], (service: StockService) => {
    expect(service).toBeTruthy();
  }));

  it('should test a method inside the service', inject([StockService], (service: StockService) => {
    expect(service.testService()).toEqual('yo');
  }));

});
