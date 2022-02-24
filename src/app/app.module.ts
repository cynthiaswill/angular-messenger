import { MessagesService } from './messages.service';
import { TransferService } from './transfer.service';
import { HomeCompnent } from './home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, HomeCompnent, ChatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeCompnent },
      { path: 'chat', component: ChatComponent },
    ]),
    HttpClientModule,
  ],
  providers: [TransferService, MessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
