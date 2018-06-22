import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Get, UrlParam } from '@ngx-patterns/http';
import { Observable, empty } from 'rxjs';
import { User, List } from './user.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  id: string;

  @Get({
    url: 'https://reqres.in/api/users/2'
  })
  user: Observable<User>

  @Get({
    url: 'https://reqres.in/api/users'
  })
  list: Observable<List<User>>

  @Get({
    url: 'https://reqres.in/api/users/${id}'
  })
  getById(@UrlParam('id') id: number) : Observable<User> {
    return empty();
  }
}
