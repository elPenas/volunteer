import { IAddress } from 'app/shared/model/address.model';
import { ICity } from 'app/shared/model/city.model';

export interface IStreet {
  id?: number;
  name?: string;
  addresses?: IAddress[];
  city?: ICity;
}

export class Street implements IStreet {
  constructor(public id?: number, public name?: string, public addresses?: IAddress[], public city?: ICity) {}
}
