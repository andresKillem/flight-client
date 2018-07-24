import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlightRequest} from '../../static/flights.reducer';
import { FlightRequestService } from '../../static/flights.services';

import {
  ActionStockMarketRetrieve,
  selectorStocks
} from './stock-market.reducer';

@Component({
  selector: 'anms-stock-market',
  templateUrl: './stock-market.component.html',
  styleUrls: ['./stock-market.component.scss']
})
export class StockMarketComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  flightRequest: FlightRequest[];

  initialized;
  stocks;

  constructor(private services: FlightRequestService,public store: Store<any>) {}

  ngOnInit() {
    this.initialized = false;
    this.store
      .select(selectorStocks)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((stocks: any) => {
        this.stocks = stocks;

        if (!this.initialized) {
          this.initialized = true;
          this.store.dispatch(
            new ActionStockMarketRetrieve({ symbol: stocks.symbol })
          );
        }
      });
    this.getFlightRequest();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSymbolChange(symbol: string) {
    this.store.dispatch(new ActionStockMarketRetrieve({ symbol }));
  }
  getFlightRequest(): void {
    this.services.getFlightRequest()
      .subscribe((flightRequest: any
      ) => {
        console.log({flightRequest});
        this.flightRequest = flightRequest.content;
        // Sort by create date
        this.flightRequest =  this.flightRequest.filter(request => request.status ==='NEW');
        this.flightRequest.sort(function(a,b) {return (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0);} );
      });
  }

}
