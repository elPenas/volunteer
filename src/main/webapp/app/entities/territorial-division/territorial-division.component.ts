import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TerritorialDivision } from './territorial-division.model';
import { TerritorialDivisionService } from './territorial-division.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-territorial-division',
    templateUrl: './territorial-division.component.html'
})
export class TerritorialDivisionComponent implements OnInit, OnDestroy {
territorialDivisions: TerritorialDivision[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private territorialDivisionService: TerritorialDivisionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.territorialDivisionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<TerritorialDivision[]>) => this.territorialDivisions = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.territorialDivisionService.query().subscribe(
            (res: HttpResponse<TerritorialDivision[]>) => {
                this.territorialDivisions = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTerritorialDivisions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TerritorialDivision) {
        return item.id;
    }
    registerChangeInTerritorialDivisions() {
        this.eventSubscriber = this.eventManager.subscribe('territorialDivisionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
