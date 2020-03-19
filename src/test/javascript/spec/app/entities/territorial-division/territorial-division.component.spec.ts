/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Covid19FightersTestModule } from '../../../test.module';
import { TerritorialDivisionComponent } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division.component';
import { TerritorialDivisionService } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division.service';
import { TerritorialDivision } from '../../../../../../main/webapp/app/entities/territorial-division/territorial-division.model';

describe('Component Tests', () => {

    describe('TerritorialDivision Management Component', () => {
        let comp: TerritorialDivisionComponent;
        let fixture: ComponentFixture<TerritorialDivisionComponent>;
        let service: TerritorialDivisionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Covid19FightersTestModule],
                declarations: [TerritorialDivisionComponent],
                providers: [
                    TerritorialDivisionService
                ]
            })
            .overrideTemplate(TerritorialDivisionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TerritorialDivisionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TerritorialDivisionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TerritorialDivision(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.territorialDivisions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
