/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Covid19FightersTestModule } from '../../../test.module';
import { TerritorialDivisionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division-delete-dialog.component';
import { TerritorialDivisionService } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division.service';

describe('Component Tests', () => {

    describe('TerritorialDivision Management Delete Component', () => {
        let comp: TerritorialDivisionDeleteDialogComponent;
        let fixture: ComponentFixture<TerritorialDivisionDeleteDialogComponent>;
        let service: TerritorialDivisionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Covid19FightersTestModule],
                declarations: [TerritorialDivisionDeleteDialogComponent],
                providers: [
                    TerritorialDivisionService
                ]
            })
            .overrideTemplate(TerritorialDivisionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TerritorialDivisionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TerritorialDivisionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
