import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8000', {
      withCredentials: true,
      autoConnect: false
    });
  }

  connect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  on(event: string, callback: (...data: any[]) => void): void {
    this.socket.on(event, callback);
  }

  emit(event: string, ...data: any): void {
    this.socket.emit(event, ...data);
  }

  emitQuestion(event: string, data: any, updatedQuestion?: Question): void {
    this.socket.emit(event, data, updatedQuestion);
  }

  isConnected(): boolean {
    return this.socket.connected;
  }
}
