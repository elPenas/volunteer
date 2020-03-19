import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITerritorialDivision } from 'app/shared/model/territorial-division.model';

@Component({
  selector: 'jhi-territorial-division-detail',
  templateUrl: './territorial-division-detail.component.html'
})
export class TerritorialDivisionDetailComponent implements OnInit {
  territorialDivision: ITerritorialDivision | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ territorialDivision }) => (this.territorialDivision = territorialDivision));
  }

  previousState(): void {
    window.history.back();
  }
}
