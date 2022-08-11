import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Any, BaseUrl, DELETE, GET, Path, Query, RebirthHttpClient} from "@ng-zorro/rebirth-http";
import {catchError, Observable, retry} from "rxjs";
import {PagedResultList} from "../../core/paged-result-list.model";
import {Paciente} from "./paciente.model";

@BaseUrl('http://localhost:8080')
@Injectable({
  providedIn: 'root'
})
export class PacienteService extends RebirthHttpClient {

  constructor(http: HttpClient) {
    super(http);
  }

  @GET('paciente')
  list(
    @Query('offset') pageIndex = 0,
    @Query('max') pageSize = 10,
    @Query('sort') sort = 'id',
    @Query('order') order = 'asc'
  ): Observable<PagedResultList<Paciente>> {
    return Any; // return Any as a placeholder
  }

  @DELETE('paciente/:id')
  destroy(@Path('id') id: number): Observable<Paciente> {
    return Any;
  }
}
