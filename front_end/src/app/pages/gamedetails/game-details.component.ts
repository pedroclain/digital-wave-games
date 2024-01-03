import { Component, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',
})
export class GameDetails {
  game: Game | null = null;

  purchaseForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [null, [Validators.min(999999999), Validators.max(99999999999)]],
    cardForm: this.formBuilder.group({
      number: [null, [Validators.required]],
      cvv: [null, [Validators.required, Validators.min(1), Validators.max(999)]],
      validation: [null, [Validators.required]],
    }),
  });

  constructor(
    private gameService: GameService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  @Input()
  set id(id: number) {
    this.loadingService.openLoading();
    this.gameService.findById(id).subscribe({
      next: (response) => {
        this.game = response;
        this.loadingService.closeLoading();
      },
      error: (error) => {
        this.alertService.alertError("Something is wrong")
      }
    });
  }

  submitContactForm() {
    this.alertService.openAlert({
      content: "This title will be purchase soon...",
      type: "success"
    })
  }
}
