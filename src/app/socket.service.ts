import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  // socket: any = io('https://nc-games-board.herokuapp.com/');
  socket: any = io('localhost:4200');
  constructor() {}
}
