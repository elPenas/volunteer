import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddress, Address } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { IStreet } from 'app/shared/model/street.model';
import { StreetService } from 'app/entities/street/street.service';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent implements OnInit {
  isSaving = false;
  streets: IStreet[] = [];

  editForm = this.fb.group({
    id: [],
    number: [],
    floor: [],
    postalCode: [],
    note: [],
    latitude: [],
    longitude: [],
    street: []
  });

  constructor(
    protected addressService: AddressService,
    protected streetService: StreetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);

      this.streetService.query().subscribe((res: HttpResponse<IStreet[]>) => (this.streets = res.body || []));
    });
  }

  updateForm(address: IAddress): void {
    this.editForm.patchValue({
      id: address.id,
      number: address.number,
      floor: address.floor,
      postalCode: address.postalCode,
      note: address.note,
      latitude: address.latitude,
      longitude: address.longitude,
      street: address.street
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['id'])!.value,
      number: this.editForm.get(['number'])!.value,
      floor: this.editForm.get(['floor'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      note: this.editForm.get(['note'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      street: this.editForm.get(['street'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>): void {
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

  trackById(index: number, item: IStreet): any {
    return item.id;
  }
}
