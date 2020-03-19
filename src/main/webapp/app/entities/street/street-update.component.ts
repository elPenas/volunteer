import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStreet, Street } from 'app/shared/model/street.model';
import { StreetService } from './street.service';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city/city.service';

@Component({
  selector: 'jhi-street-update',
  templateUrl: './street-update.component.html'
})
export class StreetUpdateComponent implements OnInit {
  isSaving = false;
  cities: ICity[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    city: []
  });

  constructor(
    protected streetService: StreetService,
    protected cityService: CityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ street }) => {
      this.updateForm(street);

      this.cityService.query().subscribe((res: HttpResponse<ICity[]>) => (this.cities = res.body || []));
    });
  }

  updateForm(street: IStreet): void {
    this.editForm.patchValue({
      id: street.id,
      name: street.name,
      city: street.city
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const street = this.createFromForm();
    if (street.id !== undefined) {
      this.subscribeToSaveResponse(this.streetService.update(street));
    } else {
      this.subscribeToSaveResponse(this.streetService.create(street));
    }
  }

  private createFromForm(): IStreet {
    return {
      ...new Street(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      city: this.editForm.get(['city'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStreet>>): void {
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

  trackById(index: number, item: ICity): any {
    return item.id;
  }
}
