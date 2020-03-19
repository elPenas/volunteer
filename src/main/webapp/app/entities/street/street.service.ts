import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Street } from './street.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Street>;

@Injectable()
export class StreetService {

    private resourceUrl =  SERVER_API_URL + 'api/streets';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/streets';

    constructor(private http: HttpClient) { }

    create(street: Street): Observable<EntityResponseType> {
        const copy = this.convert(street);
        return this.http.post<Street>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(street: Street): Observable<EntityResponseType> {
        const copy = this.convert(street);
        return this.http.put<Street>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Street>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Street[]>> {
        const options = createRequestOption(req);
        return this.http.get<Street[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Street[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Street[]>> {
        const options = createRequestOption(req);
        return this.http.get<Street[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Street[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Street = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Street[]>): HttpResponse<Street[]> {
        const jsonResponse: Street[] = res.body;
        const body: Street[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Street.
     */
    private convertItemFromServer(street: Street): Street {
        const copy: Street = Object.assign({}, street);
        return copy;
    }

    /**
     * Convert a Street to a JSON which can be sent to the server.
     */
    private convert(street: Street): Street {
        const copy: Street = Object.assign({}, street);
        return copy;
    }
}
