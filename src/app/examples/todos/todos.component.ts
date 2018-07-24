import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FlightRequest, FlightRequestState} from '../../static/flights.reducer';
import { FlightRequestService } from '../../static/flights.services';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'anms-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
  }
)
export class TodosComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  flightRequest: FlightRequest[];
  todos: FlightRequestState;

  constructor(private services: FlightRequestService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getFlightRequest();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getFlightRequest(): void {
    this.services.getFlightRequest()
      .subscribe((flightRequest: any
      ) => {
        console.log({flightRequest});
        this.flightRequest = flightRequest.content;
        // Filter by BOOKED
        this.flightRequest = this.flightRequest.filter(request => request.status ==='BOOKED');
        // Sort by create date
        this.flightRequest.sort(function(a,b) {return (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0);} );
      });
  }

  bookeFlightRequest(request: FlightRequest) {
    if (request.destination != null && request.nameOfApplicant != null) {
      if (request.travelDate != null) {
        request.status = 'RESERVED';
        console.log(request);
        this.services.bookeFlightRequest(request)
          .subscribe(hero => this.flightRequest.push(hero));

        this.openSnackBar('The Flight Request has been booked successfully!',
          'Filight Booked!');
        this.getFlightRequest();
      }
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 15000,
    });
  }
}


