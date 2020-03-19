import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IStreet } from 'app/shared/model/street.model';

type EntityResponseType = HttpResponse<IStreet>;
type EntityArrayResponseType = HttpResponse<IStreet[]>;

@Injectable({ providedIn: 'root' })
export class StreetService {
  public resourceUrl = SERVER_API_URL + 'api/streets';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/streets';

  constructor(protected http: HttpClient) {}

  create(street: IStreet): Observable<EntityResponseType> {
    return this.http.post<IStreet>(this.resourceUrl, street, { observe: 'response' });
  }

  update(street: IStreet): Observable<EntityResponseType> {
    return this.http.put<IStreet>(this.resourceUrl, street, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStreet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStreet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStreet[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
