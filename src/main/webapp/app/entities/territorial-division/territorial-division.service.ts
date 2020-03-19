import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITerritorialDivision } from 'app/shared/model/territorial-division.model';

type EntityResponseType = HttpResponse<ITerritorialDivision>;
type EntityArrayResponseType = HttpResponse<ITerritorialDivision[]>;

@Injectable({ providedIn: 'root' })
export class TerritorialDivisionService {
  public resourceUrl = SERVER_API_URL + 'api/territorial-divisions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/territorial-divisions';

  constructor(protected http: HttpClient) {}

  create(territorialDivision: ITerritorialDivision): Observable<EntityResponseType> {
    return this.http.post<ITerritorialDivision>(this.resourceUrl, territorialDivision, { observe: 'response' });
  }

  update(territorialDivision: ITerritorialDivision): Observable<EntityResponseType> {
    return this.http.put<ITerritorialDivision>(this.resourceUrl, territorialDivision, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerritorialDivision>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerritorialDivision[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerritorialDivision[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
