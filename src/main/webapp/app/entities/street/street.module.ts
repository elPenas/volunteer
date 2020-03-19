import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Covid19FightersSharedModule } from 'app/shared/shared.module';
import { StreetComponent } from './street.component';
import { StreetDetailComponent } from './street-detail.component';
import { StreetUpdateComponent } from './street-update.component';
import { StreetDeleteDialogComponent } from './street-delete-dialog.component';
import { streetRoute } from './street.route';

@NgModule({
  imports: [Covid19FightersSharedModule, RouterModule.forChild(streetRoute)],
  declarations: [StreetComponent, StreetDetailComponent, StreetUpdateComponent, StreetDeleteDialogComponent],
  entryComponents: [StreetDeleteDialogComponent]
})
export class Covid19FightersStreetModule {}
