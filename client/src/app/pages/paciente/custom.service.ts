import { Injectable } from '@angular/core';
import {catchError, map, Observable, retry, Subject, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Pagination} from "../../core/request/request.model";
import {createRequestOption} from "../../core/request/request-util";
import {PagedResultList} from "../../core/paged-result-list.model";
import {Paciente} from "./paciente.model";

@Injectable({
  providedIn: 'root'
})

export class CustomService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  list(req?: Pagination): Observable<PagedResultList<Paciente>> {
    const options = createRequestOption(req);
    return this.http.get<PagedResultList<Paciente>>(this.baseUrl + '/paciente', {params: options})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  get(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(this.baseUrl + '/paciente/'+id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  save(paciente: Paciente): Observable<Paciente> {
    const headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.delete("Content-Type");
    headers.append('X-Requested-With', 'XMLHttpRequest');

    const formData: FormData = new FormData();

    for (let property in paciente) {
      if (paciente.hasOwnProperty(property)) {
        let value;
        if (paciente[property] instanceof Date) {
          value = paciente[property].toISOString();
        } else {
          value = paciente[property];
        }
        formData.append(property, value);
      }
    }

    const requestOptions = {
      method: '',
      url: '',
      headers: headers,
      body: formData
    };

    if (paciente.id) {
      requestOptions.method = 'PUT';
      requestOptions.url = this.baseUrl + '/paciente/' + paciente.id;
    } else {
      requestOptions.method = 'POST';
      requestOptions.url = this.baseUrl + '${uri}';
    }

    return this.http.request<Paciente>(requestOptions.method, requestOptions.url, requestOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  destroy(paciente: Paciente): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + '/paciente/' + paciente.id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
}
