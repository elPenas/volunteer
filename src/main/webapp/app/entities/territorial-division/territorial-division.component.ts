import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITerritorialDivision } from 'app/shared/model/territorial-division.model';
import { TerritorialDivisionService } from './territorial-division.service';
import { TerritorialDivisionDeleteDialogComponent } from './territorial-division-delete-dialog.component';

@Component({
  selector: 'jhi-territorial-division',
  templateUrl: './territorial-division.component.html'
})
export class TerritorialDivisionComponent implements OnInit, OnDestroy {
  territorialDivisions?: ITerritorialDivision[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected territorialDivisionService: TerritorialDivisionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.territorialDivisionService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ITerritorialDivision[]>) => (this.territorialDivisions = res.body || []));
      return;
    }

    this.territorialDivisionService
      .query()
      .subscribe((res: HttpResponse<ITerritorialDivision[]>) => (this.territorialDivisions = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTerritorialDivisions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITerritorialDivision): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTerritorialDivisions(): void {
    this.eventSubscriber = this.eventManager.subscribe('territorialDivisionListModification', () => this.loadAll());
  }

  delete(territorialDivision: ITerritorialDivision): void {
    const modalRef = this.modalService.open(TerritorialDivisionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.territorialDivision = territorialDivision;
  }
}
