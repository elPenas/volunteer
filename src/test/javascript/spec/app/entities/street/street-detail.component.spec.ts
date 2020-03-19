import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Covid19FightersTestModule } from '../../../test.module';
import { StreetDetailComponent } from 'app/entities/street/street-detail.component';
import { Street } from 'app/shared/model/street.model';

describe('Component Tests', () => {
  describe('Street Management Detail Component', () => {
    let comp: StreetDetailComponent;
    let fixture: ComponentFixture<StreetDetailComponent>;
    const route = ({ data: of({ street: new Street(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Covid19FightersTestModule],
        declarations: [StreetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StreetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StreetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load street on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.street).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
