import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Guest, IGuest } from '../models/Guest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const JSON_GUESTS: string = '../assets/Guests.json';

type GuestsResponse = {
  id: number;
  firstName: string;
  lastName: string;
  reservation: {
    roomNumber: number;
    startTimestamp: number;
    endTimestamp: number;
  }
};

export interface IGuestService {
  getGuests(): Observable<IGuest[]>;
}

@Injectable()
export class GuestsService
  implements IGuestService {
  private _guests:  BehaviorSubject<IGuest[]>;

  public getGuests(): Observable<IGuest[]> {
    return this._guests.asObservable();
  }

  constructor(private _httpService: HttpService) {
    this._loadGuests();
    this._guests = <BehaviorSubject<IGuest[]>>new BehaviorSubject([]);
  }

  private _loadGuests(): void {
    this._httpService
      .get(JSON_GUESTS)
      .subscribe(
        (response: GuestsResponse[]) => this._handleLoadGuestsResponse(response),
        error => console.error('Error @ GuestsService#_loadGuests', error)
      );
  }

  private _handleLoadGuestsResponse(guests: GuestsResponse[]): void {
    console.assert(guests != null, 'Assertion Fail @ GuestsService#_handleLoadGuestsResponse: No guests');

    let formattedGuests: IGuest[] = [];

    guests.forEach((guest: GuestsResponse) => {
      console.assert(guests != null, 'Assertion Fail @ GuestsService#_handleLoadGuestsResponse: No guest');

      const newGuest: IGuest = new Guest(
        guest.id,
        guest.firstName,
        guest.lastName,
        guest.reservation.roomNumber,
        guest.reservation.startTimestamp,
        guest.reservation.endTimestamp
      );
      formattedGuests.push(newGuest);
    });

    this._guests.next(formattedGuests);
  }

}
