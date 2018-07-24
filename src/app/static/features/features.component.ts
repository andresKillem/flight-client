import { Component, OnInit} from '@angular/core';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { FlightRequest } from '../flights.reducer';
import { FlightRequestService } from '../flights.services';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'anms-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;
  flightRequest: FlightRequest[];

  constructor(private services: FlightRequestService,public snackBar: MatSnackBar){}

  ngOnInit() {}

  onSubmit(request: FlightRequest){
    if (request.destination != null && request.nameOfApplicant != null) {
      if (request.travelDate != null) {
        request["status"] = 'NEW';
        console.log(request);
        this.services.createFlightRequest(request)
          .subscribe(hero => this.flightRequest.push(hero));

        this.openSnackBar('Congratulations! Your flight request has been sent.',
          'Filight Requested!');
        this.getFlightRequest();
      } else {
        this.openSnackBar('Please, fill out all the information', 'Missing information');
      }
    } else {
      this.openSnackBar("Please, fill out all the information", "Missing information");
    }
  }

  getFlightRequest(): void {
    this.services.getFlightRequest()
      .subscribe((flightRequest: any
      ) => {
        console.log({flightRequest});
        this.flightRequest = flightRequest.content;
       }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 15000,
    });
  }

}
