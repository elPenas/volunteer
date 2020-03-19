import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TerritorialDivision } from './territorial-division.model';
import { TerritorialDivisionService } from './territorial-division.service';

@Component({
    selector: 'jhi-territorial-division-detail',
    templateUrl: './territorial-division-detail.component.html'
})
export class TerritorialDivisionDetailComponent implements OnInit, OnDestroy {

    territorialDivision: TerritorialDivision;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private territorialDivisionService: TerritorialDivisionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTerritorialDivisions();
    }

    load(id) {
        this.territorialDivisionService.find(id)
            .subscribe((territorialDivisionResponse: HttpResponse<TerritorialDivision>) => {
                this.territorialDivision = territorialDivisionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTerritorialDivisions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'territorialDivisionListModification',
            (response) => this.load(this.territorialDivision.id)
        );
    }
}
