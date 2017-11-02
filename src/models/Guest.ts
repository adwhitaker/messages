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
