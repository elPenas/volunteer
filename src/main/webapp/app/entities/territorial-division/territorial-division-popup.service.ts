import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TerritorialDivision } from './territorial-division.model';
import { TerritorialDivisionService } from './territorial-division.service';

@Injectable()
export class TerritorialDivisionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private territorialDivisionService: TerritorialDivisionService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.territorialDivisionService.find(id)
                    .subscribe((territorialDivisionResponse: HttpResponse<TerritorialDivision>) => {
                        const territorialDivision: TerritorialDivision = territorialDivisionResponse.body;
                        this.ngbModalRef = this.territorialDivisionModalRef(component, territorialDivision);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.territorialDivisionModalRef(component, new TerritorialDivision());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    territorialDivisionModalRef(component: Component, territorialDivision: TerritorialDivision): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.territorialDivision = territorialDivision;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
