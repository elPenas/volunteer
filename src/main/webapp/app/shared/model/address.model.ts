import { IStreet } from 'app/shared/model/street.model';

export interface IAddress {
  id?: number;
  number?: string;
  floor?: string;
  postalCode?: string;
  note?: string;
  latitude?: number;
  longitude?: number;
  street?: IStreet;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public number?: string,
    public floor?: string,
    public postalCode?: string,
    public note?: string,
    public latitude?: number,
    public longitude?: number,
    public street?: IStreet
  ) {}
}
