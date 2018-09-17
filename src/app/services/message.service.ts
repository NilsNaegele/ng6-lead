import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
    this.log();
  }

  clear() {
    this.messages = [];
  }

  log() {
    this.messages.forEach(message => console.log(message));
  }

}
