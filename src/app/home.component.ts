import { Component, EventEmitter, Input, Output } from '@angular/core';
import io from 'socket.io-client';

export interface JoinedSession {
  username: string;
  roomname: string;
}

@Component({
  selector: 'home',
  template: `
    <div class="homepage">
      <h1>Welcome to Angular Chat</h1>
      <input
        type="text"
        placeholder="Input your display name"
        [value]="username"
        (change)="onNameChange($event)"
      />
      <input
        type="text"
        placeholder="Input the room name"
        [value]="roomname"
        (change)="onRoomChange($event)"
      />
      <button (click)="onClick()">Join</button>
    </div>
  `,
  styleUrls: [`./home.component.css`],
})
export class HomeCompnent {
  @Input() username: string = '';
  @Input() roomname: string = '';
  @Output() joinChat = new EventEmitter();

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
      this.joinChat.emit(<JoinedSession>{
        username: this.username,
        roomname: this.roomname,
      });
    } else {
      alert('username and roomname cannot be empty !');
      window.location.reload();
    }
  }
}
