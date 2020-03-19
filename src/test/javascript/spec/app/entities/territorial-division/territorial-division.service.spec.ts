import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TerritorialDivisionService } from 'app/entities/territorial-division/territorial-division.service';
import { ITerritorialDivision, TerritorialDivision } from 'app/shared/model/territorial-division.model';
import { TerritorialDivisionType } from 'app/shared/model/enumerations/territorial-division-type.model';

describe('Service Tests', () => {
  describe('TerritorialDivision Service', () => {
    let injector: TestBed;
    let service: TerritorialDivisionService;
    let httpMock: HttpTestingController;
    let elemDefault: ITerritorialDivision;
    let expectedResult: ITerritorialDivision | ITerritorialDivision[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TerritorialDivisionService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TerritorialDivision(0, 'AAAAAAA', TerritorialDivisionType.PROVINCE);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TerritorialDivision', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TerritorialDivision()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TerritorialDivision', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            type: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TerritorialDivision', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            type: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TerritorialDivision', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
