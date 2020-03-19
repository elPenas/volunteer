import { IStreet } from 'app/shared/model/street.model';
import { ITerritorialDivision } from 'app/shared/model/territorial-division.model';

export interface ICity {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  streets?: IStreet[];
  territorialDivision?: ITerritorialDivision;
}

export class City implements ICity {
  constructor(
    public id?: number,
    public name?: string,
    public latitude?: number,
    public longitude?: number,
    public streets?: IStreet[],
    public territorialDivision?: ITerritorialDivision
  ) {}
}
