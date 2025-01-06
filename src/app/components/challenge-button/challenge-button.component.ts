import { Component, computed, Input, signal } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { Availabilities } from '../../models/enums/availabilities.enum';
import { AvailabilityIconComponent } from '../../components/availability-icon/availability-icon.component';

@Component({
  selector: 'app-challenge-button',
  standalone: true,
  imports: [AvailabilityIconComponent],
  templateUrl: './challenge-button.component.html',
  styleUrl: './challenge-button.component.css',
})
export class ChallengeButtonComponent {
  @Input() friendId: String;
  private _availability = signal<string>('');
  @Input() set availability(value: string) {
    this._availability.set(value);
  }
  isButtonEnabled = computed(() => this._availability() === Availabilities.ONLINE);
  buttonText = computed(() => {
    switch (this._availability()) {
      case Availabilities.ONLINE:
        return 'Play';
      case Availabilities.OFFLINE:
        return 'Offline';
      case Availabilities.PENDING:
        return 'On hold';
      case Availabilities.PLAYING:
        return 'Playing';
      default:
        return '';
    }
  });

  buttonClass = computed(() => {
    return [
      'challenge-button',
      this.isButtonEnabled() ? 'challenge-button-enabled' : 'challenge-button-disabled',
      `challenge-button-${this._availability()}`,
    ].join(' ');
  });

  constructor(
    private socketService: SocketService,
  ) {}

  challengeFriend(): void {
    this.socketService.emit('challenge', this.friendId)
  }
}