import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameRoomService {
  private gameRoom: string;

  setGameRoom(gameRoom: string): void {
    this.gameRoom = gameRoom;
  }

  getGameRoom(): string {
    return this.gameRoom;
  }
}