import { DECORATORS, DecoratorTypes } from "./decorator.model";


export function UrlParam(id: string) {
    return function (target: any, propertyKey: string, parameterIndex: number) {
        if (target[DECORATORS]) {
            (target[DECORATORS] as any[]).push({ type: DecoratorTypes.UrlParam, method: propertyKey, parameter: id, index: parameterIndex});
        } else {
            target[DECORATORS] = [];
            (target[DECORATORS] as any[]).push({ type: DecoratorTypes.UrlParam, method: propertyKey, parameter: id, index: parameterIndex});
        }
    }
}