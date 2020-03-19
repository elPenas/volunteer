import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TerritorialDivision } from './territorial-division.model';
import { TerritorialDivisionPopupService } from './territorial-division-popup.service';
import { TerritorialDivisionService } from './territorial-division.service';

@Component({
    selector: 'jhi-territorial-division-delete-dialog',
    templateUrl: './territorial-division-delete-dialog.component.html'
})
export class TerritorialDivisionDeleteDialogComponent {

    territorialDivision: TerritorialDivision;

    constructor(
        private territorialDivisionService: TerritorialDivisionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.territorialDivisionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'territorialDivisionListModification',
                content: 'Deleted an territorialDivision'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-territorial-division-delete-popup',
    template: ''
})
export class TerritorialDivisionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private territorialDivisionPopupService: TerritorialDivisionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.territorialDivisionPopupService
                .open(TerritorialDivisionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
