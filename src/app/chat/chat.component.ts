import { SocketService } from './../socket.service';
import { MessagesService } from './../messages.service';
import { TransferService } from './../transfer.service';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'chat',

  templateUrl: './chat.component.html',

  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private data: any = this.transferService.getData();
  username: string = this.data.username;
  roomName: string = this.data.roomName;
  messageBody: string = '';
  messages: any = [];

  constructor(
    private transferService: TransferService,
    private socketService: SocketService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.messagesService
      .getMessages(this.roomName)
      .subscribe((response: any) => {
        this.messages = response.history;
      });
    console.log(this.messages, 'on click messags');

    this.socketService.socket.on('message', (data: any) => {
      let temp = this.messages;
      temp.push({
        username: data.username,
        messageBody: data.messageBody,
        timestamp: new Date(),
      });
      this.messages = [...temp];
    });

    this.scrollToBottom();
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
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
}
