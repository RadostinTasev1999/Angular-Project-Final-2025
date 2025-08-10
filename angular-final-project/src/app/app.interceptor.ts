import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "./environment/environment.development";
import { ErrorMsgService } from "./core/error-msg/error-msg.service";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { catchError } from "rxjs";

const { apiUrl } = environment

export const appInterceptor: HttpInterceptorFn = (req,next) => {

    const API = '/api'

    if (req.url.startsWith(API)) {
        req = req.clone({
            url: req.url.replace(API, apiUrl),
            withCredentials: true
        })
    }
        debugger
    const errorMsgService = inject(ErrorMsgService)
    const router = inject(Router)
    
    return next(req)
            .pipe(
                catchError((err) => {
                    debugger
                    if (err.status === 401) {
                        debugger
                        router.navigate(['/login'])
                    } else{
                        errorMsgService.setError(err)
                        debugger
                        router.navigate(['/error'])
                    }

                    return [err];
                })
            )


}