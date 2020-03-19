import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProfile, Profile } from 'app/shared/model/profile.model';
import { ProfileService } from './profile.service';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address/address.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IAddress | IUser;

@Component({
  selector: 'jhi-profile-update',
  templateUrl: './profile-update.component.html'
})
export class ProfileUpdateComponent implements OnInit {
  isSaving = false;
  addresses: IAddress[] = [];
  users: IUser[] = [];
  birthdayDp: any;

  editForm = this.fb.group({
    id: [],
    birthday: [null, [Validators.required]],
    genre: [null, [Validators.required]],
    address: [],
    user: [null, Validators.required]
  });

  constructor(
    protected profileService: ProfileService,
    protected addressService: AddressService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profile }) => {
      this.updateForm(profile);

      this.addressService
        .query({ filter: 'profile-is-null' })
        .pipe(
          map((res: HttpResponse<IAddress[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAddress[]) => {
          if (!profile.address || !profile.address.id) {
            this.addresses = resBody;
          } else {
            this.addressService
              .find(profile.address.id)
              .pipe(
                map((subRes: HttpResponse<IAddress>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAddress[]) => (this.addresses = concatRes));
          }
        });

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(profile: IProfile): void {
    this.editForm.patchValue({
      id: profile.id,
      birthday: profile.birthday,
      genre: profile.genre,
      address: profile.address,
      user: profile.user
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profile = this.createFromForm();
    if (profile.id !== undefined) {
      this.subscribeToSaveResponse(this.profileService.update(profile));
    } else {
      this.subscribeToSaveResponse(this.profileService.create(profile));
    }
  }

  private createFromForm(): IProfile {
    return {
      ...new Profile(),
      id: this.editForm.get(['id'])!.value,
      birthday: this.editForm.get(['birthday'])!.value,
      genre: this.editForm.get(['genre'])!.value,
      address: this.editForm.get(['address'])!.value,
      user: this.editForm.get(['user'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfile>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
