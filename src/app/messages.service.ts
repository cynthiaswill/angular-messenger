import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  baseUrl: string = `nc-games-board.herokuapp.com/api`;
  constructor(private http: HttpClient) {}

  getMessages() {
    return this.http
      .get(this.baseUrl + '/messages')
      .subscribe((response: any) => {
        console.log(response.json());
      });
  }
}
