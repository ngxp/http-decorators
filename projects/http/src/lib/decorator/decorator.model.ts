export const DECORATORS = '__decorators__';

export interface HttpConfig {
    url: string;
}
export interface GetConfig extends HttpConfig {}
export interface PutConfig extends HttpConfig{}

export interface UrlConfing {
    name: string;
    default?: string;
}

export enum DecoratorTypes {
    UrlParam = 'UrlParam',
    PayloadParam = 'PayloadParam',
    Get = 'GetProp',
    GetMethod = 'GetMethod',
    PutMehtod = 'PutMethod'
}