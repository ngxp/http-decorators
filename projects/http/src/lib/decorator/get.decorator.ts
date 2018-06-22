import { GetConfig, DECORATORS, DecoratorTypes } from "./decorator.model";
import { HttpClientFactory } from "./utils";

export function Get(config: GetConfig) {
    return (target: any, propOrMethod: string, descriptor?: PropertyDescriptor) => {
        (!descriptor ? GetPropertyDecorator(target, propOrMethod, config) : GetMethodDecorator(target, propOrMethod, descriptor, config))
    }
}

function GetPropertyDecorator(target: any, prop: string, config: GetConfig) {
    //@TODO: Write if match
    if (config.url && config.url.match(/\${\w*}/))
        throw new Error(`@Get: Dynamic parameters in the url are not allowed for properties`);
    if (!target[prop]) {
        const request$ = HttpClientFactory().get(config.url);
        Object.defineProperty(target, prop, {
            get: () => {
                return request$;
            },
            set: (value: any) => {
                throw new Error(`@Get: The property ${prop} cannot be set. Remove the @Get decorator.`);
            }
        });
    }
}

function GetMethodDecorator(target: any, method: string, descriptor: PropertyDescriptor, config: GetConfig) {
    //@TODO: Mock HttpClient to get
    const httpClient = HttpClientFactory();
    let url = config.url;

    descriptor.value = function () {
        const args = arguments;
        
        let requestUrl = target[DECORATORS]
            .filter(decorator => decorator.type === DecoratorTypes.UrlParam)
            .filter(parameterDecorator => parameterDecorator.method === method)
            .map(parameterDecorator => { return { parameter: parameterDecorator.parameter, value: args[parameterDecorator.index] ||  '' }; })
            .reduce((acc: string, curr: any) => {
                acc = acc.replace(`\${${curr.parameter}}`, curr.value );
                return acc;
            }, url);
        let request$ = (target[DECORATORS] || [])
                        .filter(decorator => decorator.type === DecoratorTypes.GetMethod)
                        .filter(getMethodDecorator => getMethodDecorator.method === method && getMethodDecorator.url === requestUrl)
                        .map(getMethodDecorator => getMethodDecorator.request)[0];
        if (!request$) {
            request$ = httpClient.get(requestUrl);
            target[DECORATORS].push({ type: DecoratorTypes.GetMethod, method, request: request$, url: requestUrl});
        }
        return request$;
    };
}