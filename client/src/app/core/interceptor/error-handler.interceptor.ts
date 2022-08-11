import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {NzMessageService} from "ng-zorro-antd/message";
import {error} from "protractor";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private messageService: NzMessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (!(err.status === 401 && (err.message === '' || err.url?.includes('api/account')))) {
            this.messageService.error(err.message);
          }
        },
      })
    );
  }
}
