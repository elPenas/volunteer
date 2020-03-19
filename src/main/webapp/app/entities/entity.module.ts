import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Covid19FightersCountryModule } from './country/country.module';
import { Covid19FightersTerritorialDivisionModule } from './territorial-division/territorial-division.module';
import { Covid19FightersCityModule } from './city/city.module';
import { Covid19FightersStreetModule } from './street/street.module';
import { Covid19FightersAddressModule } from './address/address.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Covid19FightersCountryModule,
        Covid19FightersTerritorialDivisionModule,
        Covid19FightersCityModule,
        Covid19FightersStreetModule,
        Covid19FightersAddressModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Covid19FightersEntityModule {}
