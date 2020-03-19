import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TerritorialDivision } from './territorial-division.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TerritorialDivision>;

@Injectable()
export class TerritorialDivisionService {

    private resourceUrl =  SERVER_API_URL + 'api/territorial-divisions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/territorial-divisions';

    constructor(private http: HttpClient) { }

    create(territorialDivision: TerritorialDivision): Observable<EntityResponseType> {
        const copy = this.convert(territorialDivision);
        return this.http.post<TerritorialDivision>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(territorialDivision: TerritorialDivision): Observable<EntityResponseType> {
        const copy = this.convert(territorialDivision);
        return this.http.put<TerritorialDivision>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TerritorialDivision>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TerritorialDivision[]>> {
        const options = createRequestOption(req);
        return this.http.get<TerritorialDivision[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TerritorialDivision[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TerritorialDivision[]>> {
        const options = createRequestOption(req);
        return this.http.get<TerritorialDivision[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TerritorialDivision[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TerritorialDivision = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TerritorialDivision[]>): HttpResponse<TerritorialDivision[]> {
        const jsonResponse: TerritorialDivision[] = res.body;
        const body: TerritorialDivision[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TerritorialDivision.
     */
    private convertItemFromServer(territorialDivision: TerritorialDivision): TerritorialDivision {
        const copy: TerritorialDivision = Object.assign({}, territorialDivision);
        return copy;
    }

    /**
     * Convert a TerritorialDivision to a JSON which can be sent to the server.
     */
    private convert(territorialDivision: TerritorialDivision): TerritorialDivision {
        const copy: TerritorialDivision = Object.assign({}, territorialDivision);
        return copy;
    }
}
