import { SocketService } from './socket.service';
import { MessagesService } from './messages.service';
import { TransferService } from './transfer.service';
import { HomeCompnent } from './home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [AppComponent, HomeCompnent, ChatComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [TransferService, MessagesService, SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
