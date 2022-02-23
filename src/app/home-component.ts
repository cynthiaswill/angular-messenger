import { Component } from '@angular/core';
import io from 'socket.io-client';

interface JoinedSession {
  username: string;
  roomname: string;
}

@Component({
  selector: 'home',
  template: `
    <div>
      <h1>Welcome to Angular Chat</h1>
      <input type="text" [value]="username" (change)="onNameChange($event)" />
      <input type="text" [value]="roomname" (change)="onRoomChange($event)" />
      <button (click)="onClick()">Join</button>
    </div>
  `,
})
export class HomeCompnent {
  username: string = 'display name';
  roomname: string = 'room name';

  onNameChange($event: any) {
    this.username = $event.target.value;
    console.log('new username: ', this.username);
  }

  onRoomChange($event: any) {
    this.roomname = $event.target.value;
    console.log('new room: ', this.roomname);
  }

  onClick() {
    if (this.username !== '' && this.roomname !== '') {
      io().emit('joinRoom', <JoinedSession>{
        username: this.username,
        roomname: this.roomname,
      });
    } else {
      alert('username and roomname cannot be empty !');
      window.location.reload();
    }
  }
}
