import { BaseEntity } from './../../shared';

export class Street implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public addresses?: BaseEntity[],
        public city?: BaseEntity,
    ) {
    }
}
