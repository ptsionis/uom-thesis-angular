import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { FriendItemComponent } from '../friend-item/friend-item.component';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [FriendItemComponent],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.css',
})
export class FriendListComponent {
  @Output() toggleFriendlistEvent: EventEmitter<void> =
    new EventEmitter<void>();
  @Input() user: any;
  friends: any[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.emit('get_friends', null);

    this.socketService.on('set_friends', (receivedFriends: any[]) => {
      this.friends = [...receivedFriends];
      this.socketService.emit('get_friends_status', this.user.id);
    });
  }

  toggleFriendlist(): void {
    this.toggleFriendlistEvent.emit();
  }
}
