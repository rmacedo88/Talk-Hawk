import { AuthProvider } from './../../providers/auth/auth';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthProvider) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let cloneHttpRequest: HttpRequest<any>;
    let headers;

    headers = req.headers
      .set('Authorization', `Bearer ${this.auth._ID_TOKEN}`)
      .set('Content-Type', 'application/json');
    cloneHttpRequest = req.clone({ headers });

    return next.handle(cloneHttpRequest);
  }

}
