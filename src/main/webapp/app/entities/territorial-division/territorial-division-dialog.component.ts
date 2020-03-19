import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TerritorialDivision } from './territorial-division.model';
import { TerritorialDivisionPopupService } from './territorial-division-popup.service';
import { TerritorialDivisionService } from './territorial-division.service';
import { Country, CountryService } from '../country';

@Component({
    selector: 'jhi-territorial-division-dialog',
    templateUrl: './territorial-division-dialog.component.html'
})
export class TerritorialDivisionDialogComponent implements OnInit {

    territorialDivision: TerritorialDivision;
    isSaving: boolean;

    countries: Country[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private territorialDivisionService: TerritorialDivisionService,
        private countryService: CountryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService.query()
            .subscribe((res: HttpResponse<Country[]>) => { this.countries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.territorialDivision.id !== undefined) {
            this.subscribeToSaveResponse(
                this.territorialDivisionService.update(this.territorialDivision));
        } else {
            this.subscribeToSaveResponse(
                this.territorialDivisionService.create(this.territorialDivision));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TerritorialDivision>>) {
        result.subscribe((res: HttpResponse<TerritorialDivision>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TerritorialDivision) {
        this.eventManager.broadcast({ name: 'territorialDivisionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-territorial-division-popup',
    template: ''
})
export class TerritorialDivisionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private territorialDivisionPopupService: TerritorialDivisionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.territorialDivisionPopupService
                    .open(TerritorialDivisionDialogComponent as Component, params['id']);
            } else {
                this.territorialDivisionPopupService
                    .open(TerritorialDivisionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
