import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITerritorialDivision, TerritorialDivision } from 'app/shared/model/territorial-division.model';
import { TerritorialDivisionService } from './territorial-division.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country/country.service';

@Component({
  selector: 'jhi-territorial-division-update',
  templateUrl: './territorial-division-update.component.html'
})
export class TerritorialDivisionUpdateComponent implements OnInit {
  isSaving = false;
  countries: ICountry[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    type: [],
    country: []
  });

  constructor(
    protected territorialDivisionService: TerritorialDivisionService,
    protected countryService: CountryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ territorialDivision }) => {
      this.updateForm(territorialDivision);

      this.countryService.query().subscribe((res: HttpResponse<ICountry[]>) => (this.countries = res.body || []));
    });
  }

  updateForm(territorialDivision: ITerritorialDivision): void {
    this.editForm.patchValue({
      id: territorialDivision.id,
      name: territorialDivision.name,
      type: territorialDivision.type,
      country: territorialDivision.country
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const territorialDivision = this.createFromForm();
    if (territorialDivision.id !== undefined) {
      this.subscribeToSaveResponse(this.territorialDivisionService.update(territorialDivision));
    } else {
      this.subscribeToSaveResponse(this.territorialDivisionService.create(territorialDivision));
    }
  }

  private createFromForm(): ITerritorialDivision {
    return {
      ...new TerritorialDivision(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      type: this.editForm.get(['type'])!.value,
      country: this.editForm.get(['country'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITerritorialDivision>>): void {
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

  trackById(index: number, item: ICountry): any {
    return item.id;
  }
}
