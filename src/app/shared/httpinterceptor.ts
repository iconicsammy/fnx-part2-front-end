
import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

import { currentUserToken } from "./currentuser";

@Injectable()
export class InterceptAPICalls implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // req = req.clone({ headers: req.headers.set('HTTP_LANG', 'en') });

        try {
            const token = currentUserToken();

            // add it if we have one

            if (token) {
                req = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + token)
                });
            }
        } catch (e) {
            if (e instanceof TypeError) {
                // most porbably currentUser is not found
            }
        }

        // if this is a login-request the header is

        // already set to x/www/formurl/encoded.

        // so if we already have a content-type, do not

        // set it, but if we don't have one, set it to

        // setting the accept header

        req = req.clone({
            headers: req.headers.set("Accept", "application/json")
        });



        return next.handle(req);
    }
}
