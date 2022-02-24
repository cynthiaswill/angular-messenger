import { MessagesService } from './../messages.service';
import { TransferService } from './../transfer.service';
import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'chat',

  template: `
    <div class="chat">
      <div class="user-name">
        <h2>
          {{ username }}
          <span class="roomtitle">in {{ roomname }}</span>
        </h2>
      </div>
      <div class="chat-message" *ngFor="let msg of messages">
        <div *ngIf="msg.username === username" class="message">
          <p>{{ msg.text }}</p>
          <span>{{ username }}</span>
        </div>

        <!-- <div *ngIf="msg.username !== username" class="message mess-right">
          <p>{{ msg.text }}</p>
          <span>{{ msg.username }}</span>
        </div> -->
      </div>
      <div class="send">
        <input
          placeholder="enter your message"
          [value]="text"
          (keyup)="onTextChange($event)"
        />
        <button (click)="onClick()">Send</button>
      </div>
    </div>
  `,

  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  private data: any = this.transferService.getData();
  username: string = this.data.username;
  roomname: string = this.data.roomname;
  text: string = '';
  messages: any = [];

  constructor(
    private transferService: TransferService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.messages = this.messagesService.getMessages(this.roomname);
    io().on('message', (data) => {
      console.log(data);
      let temp = this.messages;
      temp.push({
        username: this.username,
        text: this.text,
        timestamp: new Date(),
      });
      this.messages = [...temp];
      console.log(this.messages, 'on click messags');
    });
  }

  onClick(): void {
    console.log(this.text, 'on button click');
    if (this.text !== '') {
      io().emit('chat', this.text);
      this.text = '';
    }
  }

  onTextChange($event: any): void {
    this.text = $event.target.value;
    console.log(this.text, 'on text change');
  }
}
