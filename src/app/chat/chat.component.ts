import { TransferService } from './../transfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',

  template: `
    <div class="chat">
      <div class="user-name">
        <h2>
          {{ username }} <span>in {{ roomname }}</span>
        </h2>
      </div>
      <!-- <div class="chat-message">
        {messages.map((msg) => {
          if (msg.username === username) {
            return (
              <div key={msg.timestamp} class="message">
                <p>{msg.text}</p>
                <span>{msg.username}</span>
              </div>
            );
          } else {
            return (
              <div key={msg.timestamp} class="message mess-right">
                <p>{msg.text} </p>
                <span>{msg.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div class="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div> -->
    </div>
  `,

  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  data = this.transferService.getData();
  constructor(private transferService: TransferService) {}

  ngOnInit(): void {}
}
