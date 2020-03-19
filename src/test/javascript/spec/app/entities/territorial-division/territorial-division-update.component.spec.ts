import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Covid19FightersTestModule } from '../../../test.module';
import { TerritorialDivisionUpdateComponent } from 'app/entities/territorial-division/territorial-division-update.component';
import { TerritorialDivisionService } from 'app/entities/territorial-division/territorial-division.service';
import { TerritorialDivision } from 'app/shared/model/territorial-division.model';

describe('Component Tests', () => {
  describe('TerritorialDivision Management Update Component', () => {
    let comp: TerritorialDivisionUpdateComponent;
    let fixture: ComponentFixture<TerritorialDivisionUpdateComponent>;
    let service: TerritorialDivisionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Covid19FightersTestModule],
        declarations: [TerritorialDivisionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TerritorialDivisionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TerritorialDivisionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TerritorialDivisionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TerritorialDivision(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TerritorialDivision();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
