import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStreet, Street } from 'app/shared/model/street.model';
import { StreetService } from './street.service';
import { StreetComponent } from './street.component';
import { StreetDetailComponent } from './street-detail.component';
import { StreetUpdateComponent } from './street-update.component';

@Injectable({ providedIn: 'root' })
export class StreetResolve implements Resolve<IStreet> {
  constructor(private service: StreetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStreet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((street: HttpResponse<Street>) => {
          if (street.body) {
            return of(street.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Street());
  }
}

export const streetRoute: Routes = [
  {
    path: '',
    component: StreetComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'covid19FightersApp.street.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StreetDetailComponent,
    resolve: {
      street: StreetResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'covid19FightersApp.street.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StreetUpdateComponent,
    resolve: {
      street: StreetResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'covid19FightersApp.street.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StreetUpdateComponent,
    resolve: {
      street: StreetResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'covid19FightersApp.street.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
