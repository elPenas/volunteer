import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICity, City } from 'app/shared/model/city.model';
import { CityService } from './city.service';
import { ITerritorialDivision } from 'app/shared/model/territorial-division.model';
import { TerritorialDivisionService } from 'app/entities/territorial-division/territorial-division.service';

@Component({
  selector: 'jhi-city-update',
  templateUrl: './city-update.component.html'
})
export class CityUpdateComponent implements OnInit {
  isSaving = false;
  territorialdivisions: ITerritorialDivision[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    latitude: [],
    longitude: [],
    territorialDivision: []
  });

  constructor(
    protected cityService: CityService,
    protected territorialDivisionService: TerritorialDivisionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ city }) => {
      this.updateForm(city);

      this.territorialDivisionService
        .query()
        .subscribe((res: HttpResponse<ITerritorialDivision[]>) => (this.territorialdivisions = res.body || []));
    });
  }

  updateForm(city: ICity): void {
    this.editForm.patchValue({
      id: city.id,
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      territorialDivision: city.territorialDivision
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const city = this.createFromForm();
    if (city.id !== undefined) {
      this.subscribeToSaveResponse(this.cityService.update(city));
    } else {
      this.subscribeToSaveResponse(this.cityService.create(city));
    }
  }

  private createFromForm(): ICity {
    return {
      ...new City(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      territorialDivision: this.editForm.get(['territorialDivision'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICity>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITerritorialDivision): any {
    return item.id;
  }
}
