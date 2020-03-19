import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { IUser } from 'app/core/user/user.model';
import { Genre } from 'app/shared/model/enumerations/genre.model';

export interface IProfile {
  id?: number;
  birthday?: Moment;
  genre?: Genre;
  address?: IAddress;
  user?: IUser;
}

export class Profile implements IProfile {
  constructor(public id?: number, public birthday?: Moment, public genre?: Genre, public address?: IAddress, public user?: IUser) {}
}
