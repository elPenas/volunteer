import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStreet } from 'app/shared/model/street.model';
import { StreetService } from './street.service';

@Component({
  templateUrl: './street-delete-dialog.component.html'
})
export class StreetDeleteDialogComponent {
  street?: IStreet;

  constructor(protected streetService: StreetService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.streetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('streetListModification');
      this.activeModal.close();
    });
  }
}
