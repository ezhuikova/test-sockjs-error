import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';

import { AppComponent } from './app.component';
import { myRxStompConfig } from './my-rx-stomp.config';
import { MessagesComponent } from './messages/messages.component';
import {DiningSocketService} from './dining-socket.service';
import {SpecialRequestWebSocketService} from './special-request-web-socket.service';
import {ReservationWebSocketService} from './reservation-web-socket.service';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    DiningSocketService, SpecialRequestWebSocketService, ReservationWebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
