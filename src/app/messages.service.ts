import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private baseUrl: string = `Https://nc-games-board.herokuapp.com/api`;
  constructor(private http: HttpClient) {}

  getMessages<T>(roomName: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/messages' + `/${roomName}`);
  }
}
