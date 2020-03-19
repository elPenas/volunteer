import { BaseEntity } from './../../shared';

export const enum TerritorialDivisionType {
    'PROVINCE',
    'STATE'
}

export class TerritorialDivision implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: TerritorialDivisionType,
        public cities?: BaseEntity[],
        public country?: BaseEntity,
    ) {
    }
}
