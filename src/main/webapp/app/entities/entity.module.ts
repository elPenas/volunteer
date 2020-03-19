import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.Covid19FightersCountryModule)
      },
      {
        path: 'territorial-division',
        loadChildren: () =>
          import('./territorial-division/territorial-division.module').then(m => m.Covid19FightersTerritorialDivisionModule)
      },
      {
        path: 'city',
        loadChildren: () => import('./city/city.module').then(m => m.Covid19FightersCityModule)
      },
      {
        path: 'street',
        loadChildren: () => import('./street/street.module').then(m => m.Covid19FightersStreetModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.Covid19FightersAddressModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.Covid19FightersProfileModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Covid19FightersEntityModule {}
