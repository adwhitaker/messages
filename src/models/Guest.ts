import { Templates } from './Message';

export interface IGuest {
  id: number;
  firstName: string;
  lastName: string;
  roomNumber: number;
  startTimestamp: number;
  endTimestamp: number;
  getPlaceholders(): Templates;
}

export class Guest
  implements IGuest {
  readonly id;
  readonly firstName;
  readonly lastName;
  readonly roomNumber;
  readonly startTimestamp;
  readonly endTimestamp;

  constructor(id: number,
              firstName: string,
              lastName: string,
              roomNumber: number,
              startTimestamp: number,
              endTimestamp: number) {
    console.assert(id != null, 'Assertion Fail @ Guest#constructor: No id');
    console.assert(firstName != null, 'Assertion Fail @ Guest#constructor: No firstName');
    console.assert(lastName != null, 'Assertion Fail @ Guest#constructor: No lastName');
    console.assert(roomNumber != null, 'Assertion Fail @ Guest#constructor: No roomNumber');
    console.assert(startTimestamp != null, 'Assertion Fail @ Guest#constructor: No startTimestamp');
    console.assert(endTimestamp != null, 'Assertion Fail @ Guest#constructor: No endTimestamp');

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roomNumber = roomNumber;
    this.startTimestamp = startTimestamp;
    this.endTimestamp = endTimestamp;
  }

  public getPlaceholders(): Templates {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      roomNumber: this.roomNumber,
      startTimestamp: this.startTimestamp,
      endTimestamp: this.endTimestamp
    };
  }
}
