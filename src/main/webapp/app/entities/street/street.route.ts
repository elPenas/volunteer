import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StreetComponent } from './street.component';
import { StreetDetailComponent } from './street-detail.component';
import { StreetPopupComponent } from './street-dialog.component';
import { StreetDeletePopupComponent } from './street-delete-dialog.component';

@Injectable()
export class StreetResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const streetRoute: Routes = [
    {
        path: 'street',
        component: StreetComponent,
        resolve: {
            'pagingParams': StreetResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.street.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'street/:id',
        component: StreetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.street.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const streetPopupRoute: Routes = [
    {
        path: 'street-new',
        component: StreetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.street.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'street/:id/edit',
        component: StreetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.street.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'street/:id/delete',
        component: StreetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'covid19FightersApp.street.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
