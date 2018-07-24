
export interface FlightRequest {
  createdAt: string;
  updatedAt: string;
  id: string;
  nameOfApplicant: string;
  travelDate: string;
  bookedDate: string;
  destination: string;
  status: string;
  approver: string;
}

export type FlightRequestFilter = 'RESERVED' | 'NEW' | 'BOOKED';

export interface FlightRequestState {
  items: FlightRequest[];
  filter: FlightRequestFilter;
}
