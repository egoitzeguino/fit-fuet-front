import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from './loginService.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.getToken();

    if(token){
      req = req.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
    }

    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Llamar a logout en caso de error 401
          this.loginService.logout();
        }
        return throwError(error);
      })
    );
  }
}
