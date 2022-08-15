import { Injectable } from '@angular/core';
import {Any, BaseUrl, GET, Path, Query, RebirthHttpClient} from "@ng-zorro/rebirth-http";
import {Observable} from "rxjs";
import {PagedResultList} from "../../core/paged-result-list.model";
import {Doctor, Specialization} from "./doctor.model";
import {HttpClient} from "@angular/common/http";

@BaseUrl('http://localhost:8080')
@Injectable({
  providedIn: 'root'
})
export class SpecializationService extends RebirthHttpClient {

  constructor(http: HttpClient) {
    super(http);
  }

  @GET('specialization')
  list(
    @Query('offset') pageIndex = 0,
    @Query('max') pageSize = 10,
    @Query('sort') sort = 'id',
    @Query('order') order = 'asc'
  ): Observable<PagedResultList<Specialization>> {
    return Any; // return Any as a placeholder
  }

  @GET('specialization/:id')
  get(@Path('id') id: number): Observable<Specialization> {
    return Any;
  }
}
