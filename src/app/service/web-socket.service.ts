// src/app/websocket.service.ts
import { Injectable } from '@angular/core';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client = new Client;
  private messagesSubject = new Subject<string[]>();

  constructor() {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8080/chat-socket');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        login: 'guest',
        passcode: 'guest',
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        this.subscribeToMessages('123');  // Example roomId
      },
      onStompError: (frame) => {
        console.error('Error: ' + frame.headers['message']);
      }
    });

    this.stompClient.activate();
  }

  public sendMessage(roomId: string, message: string) {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({ message }),
      });
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  public subscribeToMessages(roomId: string): StompSubscription {
    return this.stompClient.subscribe(`/topic/${roomId}`, (message) => {
      console.log('Received message:', message.body);
      if (message.body) {
        this.messagesSubject.next([message.body]);
      }
    });
  }

  public getMessages() {
    return this.messagesSubject.asObservable();
  }
}
