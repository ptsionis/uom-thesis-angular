import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-play-vs-friend-button',
  standalone: true,
  imports: [],
  templateUrl: './play-vs-friend-button.component.html',
  styleUrl: './play-vs-friend-button.component.css',
})
export class PlayVsFriendButtonComponent {
  @Output() toggleShowFriendlistEvent = new EventEmitter<void>();

  toggleShowFriendlist() {
    this.toggleShowFriendlistEvent.emit();
  }
}
