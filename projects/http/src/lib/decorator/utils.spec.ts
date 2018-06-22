import { HttpClient } from "@angular/common/http";
import { reduce } from "rxjs/operators";
import { HttpClientFactory, urlParameters } from "./utils";

describe('DecoratorUtils', () => {
    describe('HttpClientFactory', () => {
        it('returns a HttpClient instance', () => {
            const actual = HttpClientFactory();
            expect(actual).toEqual(jasmine.any(HttpClient));
        })
    })

    describe('getUrlParameters', () => {
        it('returns an empty array if no dynamic parameter is present', () => {
            const url = 'http://localhost/no-parameter/available';
            const expected = [];

            urlParameters(url)
                .subscribe((actual) => fail());
        });

        it('returns an array of dynamic parameters', () => {
            const url = 'http://localhost/${parameters}/are/${available}';
            const expected = ['parameters', 'available'];

            urlParameters(url).pipe(
                reduce((acc: string[], curr: string) => { acc.push(curr); return acc;}, [])
            ).subscribe(actual => expect(actual).toEqual(expected));
        });
    });
});