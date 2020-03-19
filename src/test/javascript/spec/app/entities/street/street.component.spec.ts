/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Covid19FightersTestModule } from '../../../test.module';
import { StreetComponent } from '../../../../../../main/webapp/app/entities/street/street.component';
import { StreetService } from '../../../../../../main/webapp/app/entities/street/street.service';
import { Street } from '../../../../../../main/webapp/app/entities/street/street.model';

describe('Component Tests', () => {

    describe('Street Management Component', () => {
        let comp: StreetComponent;
        let fixture: ComponentFixture<StreetComponent>;
        let service: StreetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Covid19FightersTestModule],
                declarations: [StreetComponent],
                providers: [
                    StreetService
                ]
            })
            .overrideTemplate(StreetComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StreetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StreetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Street(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.streets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
