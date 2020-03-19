import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Covid19FightersTestModule } from '../../../test.module';
import { TerritorialDivisionComponent } from 'app/entities/territorial-division/territorial-division.component';
import { TerritorialDivisionService } from 'app/entities/territorial-division/territorial-division.service';
import { TerritorialDivision } from 'app/shared/model/territorial-division.model';

describe('Component Tests', () => {
  describe('TerritorialDivision Management Component', () => {
    let comp: TerritorialDivisionComponent;
    let fixture: ComponentFixture<TerritorialDivisionComponent>;
    let service: TerritorialDivisionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Covid19FightersTestModule],
        declarations: [TerritorialDivisionComponent]
      })
        .overrideTemplate(TerritorialDivisionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TerritorialDivisionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TerritorialDivisionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TerritorialDivision(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.territorialDivisions && comp.territorialDivisions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
