import { Payload } from "./payload.decorator";
import { DECORATORS, DecoratorTypes } from "./decorator.model";

class TestClass {
    payloadMethod(@Payload() payloadParam: string): void { }
}

describe('PayloadDecorator', () => {
    let fixture;
    beforeEach(() => {
        fixture = new TestClass();
    });

    it('decorated parameter is stored in hidden property __decorators__', () => {
        const expected = { type: DecoratorTypes.PayloadParam, method: 'payloadMethod', index: 0 };
        expect(fixture[DECORATORS]).not.toBeNull();
        expect(fixture[DECORATORS][0]).toEqual(expected);
    });
});