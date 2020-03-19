/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Covid19FightersTestModule } from '../../../test.module';
import { TerritorialDivisionDialogComponent } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division-dialog.component';
import { TerritorialDivisionService } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division.service';
import { TerritorialDivision } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division.model';
import { CountryService } from '../../../../../../main/webapp/app/entities/country';

describe('Component Tests', () => {

    describe('TerritorialDivision Management Dialog Component', () => {
        let comp: TerritorialDivisionDialogComponent;
        let fixture: ComponentFixture<TerritorialDivisionDialogComponent>;
        let service: TerritorialDivisionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Covid19FightersTestModule],
                declarations: [TerritorialDivisionDialogComponent],
                providers: [
                    CountryService,
                    TerritorialDivisionService
                ]
            })
            .overrideTemplate(TerritorialDivisionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TerritorialDivisionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TerritorialDivisionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TerritorialDivision(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.territorialDivision = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'territorialDivisionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TerritorialDivision();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.territorialDivision = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'territorialDivisionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
