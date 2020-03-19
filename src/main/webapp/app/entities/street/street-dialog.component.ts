import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Street } from './street.model';
import { StreetPopupService } from './street-popup.service';
import { StreetService } from './street.service';
import { City, CityService } from '../city';

@Component({
    selector: 'jhi-street-dialog',
    templateUrl: './street-dialog.component.html'
})
export class StreetDialogComponent implements OnInit {

    street: Street;
    isSaving: boolean;

    cities: City[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private streetService: StreetService,
        private cityService: CityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cityService.query()
            .subscribe((res: HttpResponse<City[]>) => { this.cities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.street.id !== undefined) {
            this.subscribeToSaveResponse(
                this.streetService.update(this.street));
        } else {
            this.subscribeToSaveResponse(
                this.streetService.create(this.street));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Street>>) {
        result.subscribe((res: HttpResponse<Street>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Street) {
        this.eventManager.broadcast({ name: 'streetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCityById(index: number, item: City) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-street-popup',
    template: ''
})
export class StreetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private streetPopupService: StreetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.streetPopupService
                    .open(StreetDialogComponent as Component, params['id']);
            } else {
                this.streetPopupService
                    .open(StreetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
