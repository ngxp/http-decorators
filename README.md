# Angular HttpClient Decorators

[![Build Status](https://travis-ci.org/ngx-patterns/http-decorators.svg?branch=master)](https://travis-ci.org/ngx-patterns/http-decorators)

## Get

```
@Get({
  url: 'url: 'https://reqres.in/api/users'
})
```

## UrlParam

```
getUsers(@UrlParam('id') id:string): string {
  return empty();
}
```

## Put

```
@Put({
  url: 'url: 'https://reqres.in/api/users'
})
```


## Payload

```
updateUser(@Payload() user: User) {
  return empty();
}
```
