import { Injectable } from '@angular/core';
import {Any, BaseUrl, Body, DELETE, GET, Path, POST, PUT, Query, RebirthHttpClient} from "@ng-zorro/rebirth-http";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedResultList} from "../../core/paged-result-list.model";
import {Patient} from "../patient/patient.model";
import {Doctor} from "./doctor.model";

@BaseUrl('http://localhost:8080')
@Injectable({
  providedIn: 'root'
})
export class DoctorService extends RebirthHttpClient {

  constructor(http: HttpClient) {
    super(http);
  }

  @GET('doctor')
  list(
    @Query('offset') pageIndex = 0,
    @Query('max') pageSize = 10,
    @Query('sort') sort = 'id',
    @Query('order') order = 'asc'
  ): Observable<PagedResultList<Doctor>> {
    return Any; // return Any as a placeholder
  }

  @GET('doctor/:id')
  get(@Path('id') id: number): Observable<Doctor> {
    return Any;
  }

  @POST('doctor')
  save(@Body doctor: Doctor): Observable<Doctor> {
    return Any;
  }

  @PUT('doctor/:id')
  update(
    @Path('id') id: number,
    @Body doctor: Doctor
  ): Observable<Doctor> {
    return Any;
  }

  @DELETE('doctor/:id')
  delete(@Path('id') id: number): Observable<Doctor> {
    return Any;
  }
}
