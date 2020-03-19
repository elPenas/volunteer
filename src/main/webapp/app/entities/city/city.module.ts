import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Covid19FightersSharedModule } from 'app/shared/shared.module';
import { CityComponent } from './city.component';
import { CityDetailComponent } from './city-detail.component';
import { CityUpdateComponent } from './city-update.component';
import { CityDeleteDialogComponent } from './city-delete-dialog.component';
import { cityRoute } from './city.route';

@NgModule({
  imports: [Covid19FightersSharedModule, RouterModule.forChild(cityRoute)],
  declarations: [CityComponent, CityDetailComponent, CityUpdateComponent, CityDeleteDialogComponent],
  entryComponents: [CityDeleteDialogComponent]
})
export class Covid19FightersCityModule {}
