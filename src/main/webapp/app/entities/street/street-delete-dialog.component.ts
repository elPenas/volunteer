import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Street } from './street.model';
import { StreetPopupService } from './street-popup.service';
import { StreetService } from './street.service';

@Component({
    selector: 'jhi-street-delete-dialog',
    templateUrl: './street-delete-dialog.component.html'
})
export class StreetDeleteDialogComponent {

    street: Street;

    constructor(
        private streetService: StreetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.streetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'streetListModification',
                content: 'Deleted an street'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-street-delete-popup',
    template: ''
})
export class StreetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private streetPopupService: StreetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.streetPopupService
                .open(StreetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
