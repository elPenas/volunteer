import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Covid19FightersSharedModule } from 'app/shared/shared.module';
import { TerritorialDivisionComponent } from './territorial-division.component';
import { TerritorialDivisionDetailComponent } from './territorial-division-detail.component';
import { TerritorialDivisionUpdateComponent } from './territorial-division-update.component';
import { TerritorialDivisionDeleteDialogComponent } from './territorial-division-delete-dialog.component';
import { territorialDivisionRoute } from './territorial-division.route';

@NgModule({
  imports: [Covid19FightersSharedModule, RouterModule.forChild(territorialDivisionRoute)],
  declarations: [
    TerritorialDivisionComponent,
    TerritorialDivisionDetailComponent,
    TerritorialDivisionUpdateComponent,
    TerritorialDivisionDeleteDialogComponent
  ],
  entryComponents: [TerritorialDivisionDeleteDialogComponent]
})
export class Covid19FightersTerritorialDivisionModule {}
