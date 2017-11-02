import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Guest, IGuest } from '../models/Guest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const JSON_Guests: string = '../assets/Guests.json';

type guestResponse = {
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
      .get(JSON_Guests)
      .subscribe(
        (response: guestResponse[]) => this._handleLoadGuestsResponse(response),
        error => console.error('Error @ GuestsService#_loadGuests', error)
      );
  }

  private _handleLoadGuestsResponse(guests: guestResponse[]): void {
    console.assert(guests != null, 'Assertion Fail @ GuestsService#_handleLoadGuestsResponse: No guests');

    let formattedGuests: IGuest[] = [];
    guests.forEach((guest: guestResponse) => {
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
