import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any;
  colors: string[] = ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#FF9800', '#39bbb0'];

  connect(username: string, onMessageReceived: (message: any) => void, onError: (error: any) => void): void {
    const socket = new SockJS('/websocket');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/public', (payload: { body: string; }) => {
        const message = JSON.parse(payload.body);
        onMessageReceived(message);
      });

      this.stompClient.send('/app/chat.register', {}, JSON.stringify({ sender: username, type: 'JOIN' }));
    }, (error: any) => {
      onError(error);
    });
  }

  sendMessage(username: string, content: string): void {
    const chatMessage = { sender: username, content, type: 'CHAT' };
    this.stompClient.send('/app/chat.send', {}, JSON.stringify(chatMessage));
  }
}
