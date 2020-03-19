/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Covid19FightersTestModule } from '../../../test.module';
import { StreetDetailComponent } from '../../../../../../main/webapp/app/entities/street/street-detail.component';
import { StreetService } from '../../../../../../main/webapp/app/entities/street/street.service';
import { Street } from '../../../../../../main/webapp/app/entities/street/street.model';

describe('Component Tests', () => {

    describe('Street Management Detail Component', () => {
        let comp: StreetDetailComponent;
        let fixture: ComponentFixture<StreetDetailComponent>;
        let service: StreetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Covid19FightersTestModule],
                declarations: [StreetDetailComponent],
                providers: [
                    StreetService
                ]
            })
            .overrideTemplate(StreetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StreetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StreetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Street(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.street).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
