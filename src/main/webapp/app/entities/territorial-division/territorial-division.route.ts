import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TerritorialDivisionComponent } from './territorial-division.component';
import { TerritorialDivisionDetailComponent } from './territorial-division-detail.component';
import { TerritorialDivisionPopupComponent } from './territorial-division-dialog.component';
import { TerritorialDivisionDeletePopupComponent } from './territorial-division-delete-dialog.component';

export const territorialDivisionRoute: Routes = [
    {
        path: 'territorial-division',
        component: TerritorialDivisionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.territorialDivision.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'territorial-division/:id',
        component: TerritorialDivisionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.territorialDivision.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const territorialDivisionPopupRoute: Routes = [
    {
        path: 'territorial-division-new',
        component: TerritorialDivisionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.territorialDivision.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'territorial-division/:id/edit',
        component: TerritorialDivisionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.territorialDivision.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'territorial-division/:id/delete',
        component: TerritorialDivisionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.territorialDivision.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
