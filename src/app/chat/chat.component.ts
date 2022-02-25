import { SocketService } from './../socket.service';
import { MessagesService } from './../messages.service';
import { TransferService } from './../transfer.service';
import { Component, OnInit } from '@angular/core';

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
          <p class="p-left">{{ msg.messageBody }}</p>
          <span class="span-left">{{ username }}</span>
        </div>

        <div *ngIf="msg.username !== username" class="message mess-right">
          <p class="p-right">{{ msg.messageBody }}</p>
          <span class="span-right">{{ msg.username }}</span>
        </div>
      </div>
      <div class="send">
        <input
          placeholder="enter your message"
          [value]="messageBody"
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
  messageBody: string = '';
  messages: any = [];

  constructor(
    private transferService: TransferService,
    private socketService: SocketService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.messagesService
      .getMessages(this.roomname)
      .subscribe((response: any) => {
        this.messages = response.history;
      });
    console.log(this.messages, 'on click messags');

    this.socketService.socket.on('message', (data: any) => {
      console.log(this.messages, 'messages on emitting');
      let temp = this.messages;
      temp.push({
        username: data.username,
        messageBody: data.messageBody,
        timestamp: new Date(),
      });
      this.messages = [...temp];
    });
  }

  onClick(): void {
    console.log(this.messageBody, 'on button click');
    if (this.messageBody !== '') {
      this.socketService.socket.emit('chat', this.messageBody);
      this.messageBody = '';
    }
  }

  onTextChange($event: any): void {
    this.messageBody = $event.target.value;
    console.log(this.messageBody, 'on messageBody change');
  }
}
