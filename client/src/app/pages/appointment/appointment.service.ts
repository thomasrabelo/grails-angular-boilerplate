import { Injectable } from '@angular/core';
import {Any, BaseUrl, Body, DELETE, GET, Path, POST, PUT, Query, RebirthHttpClient} from "@ng-zorro/rebirth-http";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedResultList} from "../../core/paged-result-list.model";
import {Appointment} from "./appointment.model";

@BaseUrl('http://localhost:8080')
@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends RebirthHttpClient {

  constructor(http: HttpClient) {
    super(http);
  }

  @GET('appointment')
  list(
    @Query('offset') pageIndex = 0,
    @Query('max') pageSize = 10,
    @Query('sort') sort = 'id',
    @Query('order') order = 'asc'
  ): Observable<PagedResultList<Appointment>> {
    return Any; // return Any as a placeholder
  }

  @GET('appointment/:id')
  get(@Path('id') id: number): Observable<Appointment> {
    return Any;
  }

  @POST('appointment')
  save(@Body appointment: Appointment): Observable<Appointment> {
    return Any;
  }

  @PUT('appointment/:id')
  update(
    @Path('id') id: number,
    @Body appointment: Appointment
  ): Observable<Appointment> {
    return Any;
  }

  @DELETE('appointment/:id')
  delete(@Path('id') id: number): Observable<Appointment> {
    return Any;
  }
}
