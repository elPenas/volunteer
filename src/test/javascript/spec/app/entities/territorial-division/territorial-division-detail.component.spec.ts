/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Covid19FightersTestModule } from '../../../test.module';
import { TerritorialDivisionDetailComponent } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division-detail.component';
import { TerritorialDivisionService } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division.service';
import { TerritorialDivision } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division.model';

describe('Component Tests', () => {

    describe('TerritorialDivision Management Detail Component', () => {
        let comp: TerritorialDivisionDetailComponent;
        let fixture: ComponentFixture<TerritorialDivisionDetailComponent>;
        let service: TerritorialDivisionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Covid19FightersTestModule],
                declarations: [TerritorialDivisionDetailComponent],
                providers: [
                    TerritorialDivisionService
                ]
            })
            .overrideTemplate(TerritorialDivisionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TerritorialDivisionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TerritorialDivisionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TerritorialDivision(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.territorialDivision).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
