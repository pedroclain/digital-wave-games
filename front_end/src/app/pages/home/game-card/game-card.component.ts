import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../../models/game.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css',
})
export class GameCardComponent {
  @Input() game: Game | null = null;
}
