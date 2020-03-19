import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Street } from './street.model';
import { StreetService } from './street.service';

@Component({
    selector: 'jhi-street-detail',
    templateUrl: './street-detail.component.html'
})
export class StreetDetailComponent implements OnInit, OnDestroy {

    street: Street;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private streetService: StreetService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStreets();
    }

    load(id) {
        this.streetService.find(id)
            .subscribe((streetResponse: HttpResponse<Street>) => {
                this.street = streetResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStreets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'streetListModification',
            (response) => this.load(this.street.id)
        );
    }
}
