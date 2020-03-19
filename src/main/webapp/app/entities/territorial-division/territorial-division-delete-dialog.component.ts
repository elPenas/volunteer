import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITerritorialDivision } from 'app/shared/model/territorial-division.model';
import { TerritorialDivisionService } from './territorial-division.service';

@Component({
  templateUrl: './territorial-division-delete-dialog.component.html'
})
export class TerritorialDivisionDeleteDialogComponent {
  territorialDivision?: ITerritorialDivision;

  constructor(
    protected territorialDivisionService: TerritorialDivisionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.territorialDivisionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('territorialDivisionListModification');
      this.activeModal.close();
    });
  }
}
