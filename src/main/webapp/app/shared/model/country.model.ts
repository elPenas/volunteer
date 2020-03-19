import { ITerritorialDivision } from 'app/shared/model/territorial-division.model';

export interface ICountry {
  id?: number;
  name?: string;
  code?: string;
  territorialDivisions?: ITerritorialDivision[];
}

export class Country implements ICountry {
  constructor(public id?: number, public name?: string, public code?: string, public territorialDivisions?: ITerritorialDivision[]) {}
}
