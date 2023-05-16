import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private userAuthService: UserAuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get the access token from wherever you have stored it
    const accessToken = this.userAuthService.getAccessToken();

    if (accessToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

  /*private addToken(request: HttpRequest<any>, accessToken: string){
    return request.clone(
      {
        setHeaders: {
          Authorization : `Bearer ${accessToken}`
        }
      }
    );
  }*/
}
