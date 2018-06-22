
import { Injector } from '@angular/core';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

const parameterRegex: RegExp = /\${\w*}/gm;

export function HttpClientFactory(): HttpClient {
    const injector = Injector.create({
        providers: [
            { provide: HttpClient, deps: [HttpHandler] },
            { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest }) },
        ],
    });
    return injector.get(HttpClient);
}

export function urlParameters(url: string): Observable<string> {
    return Observable.create((observer) => {
        (url.match(parameterRegex) || [])
            .map(elem => elem.replace(/[$\{\}]/gm, ''))
            .map(elem => observer.next(elem));
    });
}
