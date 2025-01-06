import { Component, Input } from '@angular/core';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-category-winrate-bar',
  standalone: true,
  imports: [RoundProgressModule],
  templateUrl: './category-winrate-bar.component.html',
  styleUrl: './category-winrate-bar.component.css',
})
export class CategoryWinrateBarComponent {
  @Input() categoryName: String;
  @Input() winrate: number;
}
