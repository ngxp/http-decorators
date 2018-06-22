import { UrlParam } from "./url-param.decorator";
import { DECORATORS } from "./decorator.model";

class TestClass {
    decoratedMethode(@UrlParam('id') id: number) {}
}

describe('ParamDecorator', () => {
    let fixture: TestClass;

    beforeEach(() => {
        fixture = new TestClass();
    });

    it('decorated parameter is stored in hidden property __decorators__', () => {
        expect(fixture[DECORATORS]).not.toBeNull();
    });
});