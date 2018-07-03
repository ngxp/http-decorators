import { PutConfig, DECORATORS, DecoratorTypes } from "./decorator.model";
import { HttpClientFactory } from "./utils";

export function Put(config: PutConfig) {
    return (target: any, method: string, descriptor: PropertyDescriptor) => {
        return PutMethodDecorator(config, target, method, descriptor);
    }
}

function PutMethodDecorator(config: PutConfig, target: any, method: string, descriptor: PropertyDescriptor) {
    const httpClient = HttpClientFactory();
    descriptor.value = function () {
        const putMethodDecorators = (target[DECORATORS] || [])
            .filter((decorator) => DecoratorTypes.PayloadParam === decorator.type)
            .filter((putMethodDecorator) => method === putMethodDecorator.method);
        if (putMethodDecorators instanceof Array) {
            throw new Error(`There should only be one payload decorator on ${method}`);
        }
        const putMethodDecorator = putMethodDecorators[0];
        const payload = arguments[putMethodDecorator.index];
        const $request = httpClient.put(config.url, payload);
        return $request;
    };
}