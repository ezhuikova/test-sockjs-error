import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public receivedMessages: string[] = [];
  private topicSubscription2: Subscription;
  private topicSubscription1: Subscription;
  dateIndex = 0;

  constructor(private rxStompService: RxStompService) {
  }

  ngOnInit() {
    this.runSubscription();
  }

  runSubscription() {
    const date = this.getDate();
    if (this.topicSubscription1 != null) {
      this.topicSubscription1.unsubscribe();
    }
    this.topicSubscription1 = this.rxStompService.watch('/topic/reservations/diningDateTime/' + date)
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
      });

    setTimeout(() => {
      if (this.topicSubscription2 != null) {
        this.topicSubscription2.unsubscribe();
      }
      this.topicSubscription2 = this.rxStompService.watch('/topic/diningSpecialRequests/requestDate/' + date)
        .subscribe((message: Message) => {
          this.receivedMessages.push(message.body);
        });

    }, 1500);

  }

  ngOnDestroy() {
  }


  private getDate(): string {
    const dateItems = ['20181121-20181122', '20181122-20181123'];
    if (this.dateIndex === 1) {
      this.dateIndex = 0;
    } else {
      this.dateIndex = +1;
    }

    return dateItems[this.dateIndex];
  }
}
