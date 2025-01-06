import { Component, computed, Input, signal } from '@angular/core';
import { Categories } from '../../models/enums/categories.enum';
import { GameCategoryTileComponent } from '../game-category-tile/game-category-tile.component';
import { getQuestionTileId } from '../../utils/other-utils';

@Component({
  selector: 'app-game-categories-wrapper',
  standalone: true,
  imports: [
    GameCategoryTileComponent
  ],
  templateUrl: './game-categories-wrapper.component.html',
  styleUrls: ['./game-categories-wrapper.component.css'],
})
export class GameCategoriesWrapperComponent {
    readonly Categories = Categories;
    private _categories = signal(Categories);
  @Input() turn: Number
  @Input() questionsPlayed: any[]
  @Input() question: any
  getQuestionTileId = getQuestionTileId

  categoriesKeys = computed(() =>
    Object.keys(this._categories()).filter(key => isNaN(Number(key)))
  );
}
