import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Covid19FightersSharedModule } from '../../shared';
import {
    TerritorialDivisionService,
    TerritorialDivisionPopupService,
    TerritorialDivisionComponent,
    TerritorialDivisionDetailComponent,
    TerritorialDivisionDialogComponent,
    TerritorialDivisionPopupComponent,
    TerritorialDivisionDeletePopupComponent,
    TerritorialDivisionDeleteDialogComponent,
    territorialDivisionRoute,
    territorialDivisionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...territorialDivisionRoute,
    ...territorialDivisionPopupRoute,
];

@NgModule({
    imports: [
        Covid19FightersSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TerritorialDivisionComponent,
        TerritorialDivisionDetailComponent,
        TerritorialDivisionDialogComponent,
        TerritorialDivisionDeleteDialogComponent,
        TerritorialDivisionPopupComponent,
        TerritorialDivisionDeletePopupComponent,
    ],
    entryComponents: [
        TerritorialDivisionComponent,
        TerritorialDivisionDialogComponent,
        TerritorialDivisionPopupComponent,
        TerritorialDivisionDeleteDialogComponent,
        TerritorialDivisionDeletePopupComponent,
    ],
    providers: [
        TerritorialDivisionService,
        TerritorialDivisionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Covid19FightersTerritorialDivisionModule {}
