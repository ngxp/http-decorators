export const DECORATORS = '__decorators__';

export interface GetConfig {
    url: string;
}

export interface UrlConfing {
    name: string;
    default?: string;
}

export enum DecoratorTypes {
    UrlParam = 'Param',
    Get = 'Get',
    GetMethod = 'GetMethod',
}