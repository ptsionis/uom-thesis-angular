import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { UserService } from '../../services/user.service';
import { GameRoomService } from '../../services/gameRoom.service';
import { Stages } from '../../models/enums/stages.enum';
import { LoaderRingComponent } from '../../components/loader-ring/loader-ring.component';
import { GamePlayerComponent } from "../../components/game-player/game-player.component";
import { ScoreBoardComponent } from "../../components/score-board/score-board.component";
import { Router } from '@angular/router';
import { GameCategoriesWrapperComponent } from '../../components/game-categories-wrapper/game-categories-wrapper.component';
import { GameQuestionWrapperComponent } from '../../components/game-question-wrapper/game-question-wrapper.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    LoaderRingComponent,
    GamePlayerComponent,
    ScoreBoardComponent,
    GameCategoriesWrapperComponent,
    GameQuestionWrapperComponent
],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  readonly Stages = Stages;
  user: any;
  gameRoom: string | null = null;
  player: any
  opponent: any
  turn: Number = 0
  stage: Stages = Stages.SELECTION
  question: Object | null = null
  questionsPlayed: Object[] = []

  constructor(
    private socketService: SocketService,
    private userService: UserService,
    private gameRoomService: GameRoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.socketService.emit('game_init_info', this.gameRoomService.getGameRoom());
  
    this.socketService.on(
      'set_game_init_info',
      (playerData: any, opponentData: any, turnData: any) => {
        this.player = playerData;
        this.opponent = opponentData;
        this.turn = turnData;
      }
    );

    this.socketService.on('set_question', (questionData) => {
      this.stage = Stages.QUESTION
      this.question = questionData;
    })

    this.socketService.on('update_players', (playerData: Object | null, opponentData: Object | null) => {
      console.log("playerData", playerData)
      console.log("opponentData", opponentData)
      this.player = playerData;
      this.opponent = opponentData;
    })

    this.socketService.on('start_next_round', (questionsPlayedData: Object[] | null, turnData: Number | null) => {
      this.questionsPlayed = questionsPlayedData || [];
      this.turn = turnData || 0;
      this.stage = Stages.SELECTION;
    })

    this.socketService.on('opponent_quit', () => {
      this.router.navigate(['/']);
    })

    this.socketService.on('game_ended', () => {
      this.router.navigate(['/']);
    })
  }
}
