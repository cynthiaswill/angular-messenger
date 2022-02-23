import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',

  template: `
  <div className="chat">
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
        </h2>
      </div>
      <div className="chat-message">
        {messages.map((msg) => {
          if (msg.username === username) {
            return (
              <div key={msg.timestamp} className="message">
                <p>{msg.text}</p>
                <span>{msg.username}</span>
              </div>
            );
          } else {
            return (
              <div key={msg.timestamp} className="message mess-right">
                <p>{msg.text} </p>
                <span>{msg.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
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
      </div>
    </div>
  `,

  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
