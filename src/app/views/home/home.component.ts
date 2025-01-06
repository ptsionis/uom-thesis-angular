import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { UserService } from '../../services/user.service';
import { GameRoomService } from '../../services/gameRoom.service';
import { Roles } from '../../models/enums/roles.enum';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderRingComponent } from '../../components/loader-ring/loader-ring.component';
import { QuickPlayButtonComponent } from '../../components/quick-play-button/quick-play-button.component';
import { SubmitQuestionButtonComponent } from '../../components/submit-question-button/submit-question-button.component';
import { AdminPendingButtonComponent } from '../../components/admin-pending-button/admin-pending-button.component';
import { AdminPendingQuestionsComponent } from '../../components/admin-pending-questions/admin-pending-questions.component';
import { AdminQuestionsButtonComponent } from '../../components/admin-questions-button/admin-questions-button.component';
import { AdminQuestionsComponent } from '../../components/admin-questions/admin-questions.component';
import { QuestionFormComponent } from '../../components/question-form/question-form.component';
import { LogoutButtonComponent } from '../../components/logout-button/logout-button.component';
import { OpenChallengeModalComponent } from '../../components/open-challenge-modal/open-challenge-modal.component';
import { urlInitialization } from '../../utils/page-utils';
import { ProfilePreviewComponent } from '../../components/profile-preview/profile-preview.component';
import { PlayVsFriendButtonComponent } from '../../components/play-vs-friend-button/play-vs-friend-button.component';
import { FriendListComponent } from '../../components/friend-list/friend-list.component';
import { ChallengeModalComponent } from '../../components/challenge-modal/challenge-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderRingComponent,
    QuickPlayButtonComponent,
    LogoutButtonComponent,
    OpenChallengeModalComponent,
    SubmitQuestionButtonComponent,
    AdminPendingButtonComponent,
    AdminQuestionsButtonComponent,
    AdminPendingQuestionsComponent,
    AdminQuestionsComponent,
    QuestionFormComponent,
    ProfilePreviewComponent,
    PlayVsFriendButtonComponent,
    FriendListComponent,
    ChallengeModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  readonly Roles = Roles;
  user: any;
  showProfile: boolean = false;
  showFriendlist: boolean = false;
  showQuestionForm: boolean = false;
  showChallengeModal: boolean = false;
  showOpenChallengeModal: boolean = false;
  showAdminPending: boolean = false;
  showAdminQuestions: boolean = false;
  showErrorModal: boolean = false;
  errorText: string = '';
  challenger: any = null;

  constructor(
    private socketService: SocketService,
    private userService: UserService,
    private gameRoomService: GameRoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    urlInitialization();

    this.socketService.connect();
    this.socketService.emit('user_init', null);

    this.socketService.on('user_init_success', (userData: any) => {
      this.userService.setUser(userData);
      this.user = userData;
    });

    this.socketService.emit('available', null);

    this.socketService.on(
      'challenge_notification_detailed',
      (challengerProfile: any) => {
        this.challenger = challengerProfile;
        this.showChallengeModal = true;
      }
    );

    this.socketService.on('challenge_cancelled_ta', () => {
      this.showChallengeModal = false;
    });

    this.socketService.on('challenger_left', () => {
      this.showChallengeModal = false;
    });

    this.socketService.on('challenge_error', (challengeErrorMsg: string) => {
      this.showErrorModal = true;
      this.errorText = challengeErrorMsg;
    });

    this.socketService.on('rejected_successfully', () => {
      this.showChallengeModal = false;
    });

    this.socketService.on('open_challenge_created', () => {
      this.showOpenChallengeModal = true;
    });

    this.socketService.on('open_challenge_cancelled', () => {
      this.showOpenChallengeModal = false;
    });

    this.socketService.on('start_game', (newRoomId) => {
      this.gameRoomService.setGameRoom(newRoomId);
      this.router.navigate(['/game']);
    });
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/images/noPicture.webp';
  }

  closeModal() {
    this.showErrorModal = false;
  }

  toggleShowProfile() {
    this.showProfile = !this.showProfile;
  }

  toggleShowFriendlist() {
    this.showFriendlist = !this.showFriendlist;
  }

  toggleShowQuestionForm() {
    this.showQuestionForm = !this.showQuestionForm;
  }

  toggleShowAdminPending() {
    this.showAdminPending = !this.showAdminPending;
  }

  toggleShowAdminQuestions() {
    this.showAdminQuestions = !this.showAdminQuestions;
  }
}
