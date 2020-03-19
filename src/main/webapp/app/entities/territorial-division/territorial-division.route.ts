import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITerritorialDivision, TerritorialDivision } from 'app/shared/model/territorial-division.model';
import { TerritorialDivisionService } from './territorial-division.service';
import { TerritorialDivisionComponent } from './territorial-division.component';
import { TerritorialDivisionDetailComponent } from './territorial-division-detail.component';
import { TerritorialDivisionUpdateComponent } from './territorial-division-update.component';

@Injectable({ providedIn: 'root' })
export class TerritorialDivisionResolve implements Resolve<ITerritorialDivision> {
  constructor(private service: TerritorialDivisionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITerritorialDivision> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((territorialDivision: HttpResponse<TerritorialDivision>) => {
          if (territorialDivision.body) {
            return of(territorialDivision.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TerritorialDivision());
  }
}

export const territorialDivisionRoute: Routes = [
  {
    path: '',
    component: TerritorialDivisionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'covid19FightersApp.territorialDivision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TerritorialDivisionDetailComponent,
    resolve: {
      territorialDivision: TerritorialDivisionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'covid19FightersApp.territorialDivision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TerritorialDivisionUpdateComponent,
    resolve: {
      territorialDivision: TerritorialDivisionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'covid19FightersApp.territorialDivision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TerritorialDivisionUpdateComponent,
    resolve: {
      territorialDivision: TerritorialDivisionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'covid19FightersApp.territorialDivision.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
