import { Injectable } from '@angular/core';
import {Any, BaseUrl, GET, Path, Query, RebirthHttpClient} from "@ng-zorro/rebirth-http";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Department} from "./doctor.model";
import {PagedResultList} from "../../core/paged-result-list.model";

@BaseUrl('http://localhost:8080')
@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends RebirthHttpClient {

  constructor(http: HttpClient) {
    super(http);
  }

  @GET('department')
  list(
    @Query('offset') pageIndex = 0,
    @Query('max') pageSize = 10,
    @Query('sort') sort = 'id',
    @Query('order') order = 'asc'
  ): Observable<PagedResultList<Department>> {
    return Any; // return Any as a placeholder
  }

  @GET('department/:id')
  get(@Path('id') id: number): Observable<Department> {
    return Any;
  }
}
