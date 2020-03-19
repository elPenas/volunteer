import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStreet } from 'app/shared/model/street.model';

@Component({
  selector: 'jhi-street-detail',
  templateUrl: './street-detail.component.html'
})
export class StreetDetailComponent implements OnInit {
  street: IStreet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ street }) => (this.street = street));
  }

  previousState(): void {
    window.history.back();
  }
}
