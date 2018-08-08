import { switchMap } from 'rxjs/operators/switchMap';
import { merge } from 'rxjs/operators/merge';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private angularFireAuth: AngularFireAuth) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // return of([]).pipe(
    //   merge(this.angularFireAuth.idToken),
    //   map(token => {
    //     console.log(token);
    //     let cloneHttpRequest: HttpRequest<any>;
    //     let headers;

    //     headers = req.headers.set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
    //     cloneHttpRequest = req.clone({ headers });

    //     return cloneHttpRequest;
    //   }),
    //   switchMap(test => next.handle(test))
    // );

    let TOKEN = null;

    let cloneHttpRequest: HttpRequest<any>;
    let headers;

    headers = req.headers.set('Authorization', `Bearer ${TOKEN}`).set('Content-Type', 'application/json');
    cloneHttpRequest = req.clone({ headers });

    return next.handle(cloneHttpRequest);
  }

}
