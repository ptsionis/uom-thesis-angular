import { Component } from '@angular/core';
import { SocketService } from '../../socket/socket.service';

@Component({
  selector: 'quick-play-button',
  standalone: true,
  templateUrl: './quick-play-button.component.html',
  styleUrls: ['./quick-play-button.component.css']
})
export class QuickPlayButtonComponent {
  constructor(
    private socketService: SocketService,
  ) {}

  createOpenChallenge() {
    this.socketService.emit("challenge_open", null);
  }
}