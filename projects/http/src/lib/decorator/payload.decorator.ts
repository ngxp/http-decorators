import { DECORATORS, DecoratorTypes } from "./decorator.model";

export function Payload() {
    return function (target: any, propertyKey: string, parameterIndex: number) {
        if (target[DECORATORS]) {
            (target[DECORATORS] as any[]).push({ type: DecoratorTypes.PayloadParam, method: propertyKey, index: parameterIndex});
        } else {
            target[DECORATORS] = [];
            (target[DECORATORS] as any[]).push({ type: DecoratorTypes.PayloadParam, method: propertyKey, index: parameterIndex});
        }
    }
}