import { Observable, empty } from "rxjs";
import { UrlParam } from "./url-param.decorator";
import { Get } from "./get.decorator";

class TestClass {
    @Get({
        url: 'http://localhost/rest/contact/1337'
    })
    decoratedProperty: Observable<string>;

    @Get({
        url: 'http://localhost/rest/contact/${id}'
    })
    decoratedMethod(@UrlParam('id')id: number): Observable<string> {
        return null;
    }
}

describe('GetDecorator', () => {
    let fixture: TestClass;

    beforeEach(() => {
        fixture = new TestClass();
    });

    describe('decorated property', () => {
        it('get of the annotated property returns an observable', () => {
            expect(fixture.decoratedProperty).not.toBeNull();
            expect(fixture.decoratedProperty).toEqual(jasmine.any(Observable));
        });
    
        it('set of the annotated property causes an error', () => {
            expect(() => { 
                fixture.decoratedProperty = empty(); 
            }).toThrow(new Error('@Get: The property decoratedProperty cannot be set. Remove the @Get decorator.'));
        });

        it('if the url of the decorator contains an dynamic parameter it throws an error', () => {
            expect(() => {
                class ErrornousTestClass {
                    @Get({
                        url: 'http://localhost/rest/contact/${id}'
                    })
                    errornousDecoratedProperty: Observable<string>;
                }
            }).toThrow(new Error('@Get: Dynamic parameters in the url are not allowed for properties'));
        })
    });

    describe('decorated method', () => {
        const idParameter = 1337;

        it('execution of the decorated method returns an Observable', () => {
            expect(fixture.decoratedMethod(idParameter)).not.toBeNull();
            expect(fixture.decoratedMethod(idParameter)).toEqual(jasmine.any(Observable));
        });

        it('', () => {

        });
    });
});