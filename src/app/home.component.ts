import { SocketService } from './socket.service';
import { TransferService } from './transfer.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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
        (keyup)="onNameChange($event)"
      />
      <input
        type="text"
        placeholder="Input the room name"
        [value]="roomname"
        (keyup)="onRoomChange($event)"
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
  constructor(
    private transferService: TransferService,
    private socketService: SocketService,
    private router: Router
  ) {}

  onNameChange($event: any) {
    this.username = $event.target.value;
    console.log('new username: ', this.username);
  }

  onRoomChange($event: any) {
    this.roomname = $event.target.value;
    console.log('new room: ', this.roomname);
  }

  onClick() {
    const data: JoinedSession = {
      username: this.username,
      roomname: this.roomname,
    };

    if (this.username !== '' && this.roomname !== '') {
      this.socketService.socket.emit('joinRoom', data);
      this.joinChat.emit(data);
      this.transferService.setData(data);
      this.router.navigateByUrl('chat');
    } else {
      alert('username and roomname cannot be empty !');
      window.location.reload();
    }
  }
}
