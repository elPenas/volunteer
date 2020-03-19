import { BaseEntity } from './../../shared';

export class City implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public latitude?: number,
        public longitude?: number,
        public streets?: BaseEntity[],
        public territorialDivision?: BaseEntity,
    ) {
    }
}
