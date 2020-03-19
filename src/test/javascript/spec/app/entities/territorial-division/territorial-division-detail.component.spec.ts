import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Covid19FightersTestModule } from '../../../test.module';
import { TerritorialDivisionDetailComponent } from 'app/entities/territorial-division/territorial-division-detail.component';
import { TerritorialDivision } from 'app/shared/model/territorial-division.model';

describe('Component Tests', () => {
  describe('TerritorialDivision Management Detail Component', () => {
    let comp: TerritorialDivisionDetailComponent;
    let fixture: ComponentFixture<TerritorialDivisionDetailComponent>;
    const route = ({ data: of({ territorialDivision: new TerritorialDivision(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Covid19FightersTestModule],
        declarations: [TerritorialDivisionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TerritorialDivisionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TerritorialDivisionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load territorialDivision on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.territorialDivision).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
