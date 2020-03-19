import { BaseEntity } from './../../shared';

export class Address implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public floor?: string,
        public postalCode?: string,
        public note?: string,
        public latitude?: number,
        public longitude?: number,
        public street?: BaseEntity,
    ) {
    }
}
