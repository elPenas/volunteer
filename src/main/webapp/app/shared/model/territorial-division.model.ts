import { ICity } from 'app/shared/model/city.model';
import { ICountry } from 'app/shared/model/country.model';
import { TerritorialDivisionType } from 'app/shared/model/enumerations/territorial-division-type.model';

export interface ITerritorialDivision {
  id?: number;
  name?: string;
  type?: TerritorialDivisionType;
  cities?: ICity[];
  country?: ICountry;
}

export class TerritorialDivision implements ITerritorialDivision {
  constructor(
    public id?: number,
    public name?: string,
    public type?: TerritorialDivisionType,
    public cities?: ICity[],
    public country?: ICountry
  ) {}
}
