import { Injectable } from '@angular/core';
import {Any, BaseUrl, Body, DELETE, GET, Path, POST, PUT, Query, RebirthHttpClient} from "@ng-zorro/rebirth-http";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedResultList} from "../../core/paged-result-list.model";
import {Patient} from "./patient.model";

@BaseUrl('http://localhost:8080')
@Injectable({
  providedIn: 'root'
})
export class PatientService extends RebirthHttpClient {

  constructor(http: HttpClient) {
    super(http);
  }

  @GET('patient')
  list(
    @Query('offset') pageIndex = 0,
    @Query('max') pageSize = 10,
    @Query('sort') sort = 'id',
    @Query('order') order = 'asc'
  ): Observable<PagedResultList<Patient>> {
    return Any; // return Any as a placeholder
  }

  @GET('patient/:id')
  get(@Path('id') id: string): Observable<Patient> {
    return Any;
  }

  @POST('patient')
  save(@Body patient: Patient): Observable<Patient> {
    return Any;
  }

  @PUT('patient/:id')
  update(
    @Path('id') id: string,
    @Body patient: Patient
  ): Observable<Patient> {
    return Any;
  }

  @DELETE('patient/:id')
  delete(@Path('id') id: number): Observable<Patient> {
    return Any;
  }
}
