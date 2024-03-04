import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { AlertService } from '../../services/alert.service';
import { LoadingBarComponent } from '../../components/loading-bar/loading-bar.component';
import { CustomValidators } from '../../validators/custom.validator';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingBarComponent],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',
})
export class GameDetails {
  game: Game | null = null;

  purchaseForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(32)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      null,
      [
        CustomValidators.numberMinLength(8),
        CustomValidators.numberMaxLength(12),
      ],
    ],
    cardForm: this.formBuilder.group({
      number: [
        null,
        [
          Validators.required,
          CustomValidators.numberMinLength(12),
          CustomValidators.numberMaxLength(16),
        ],
      ],
      cvv: [null, [Validators.required, CustomValidators.numberLength(3)]],
      validation: [null, [Validators.required]],
    }),
  });

  constructor(
    private gameService: GameService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {}

  @Input()
  set id(id: number) {
    this.gameService.findById(id).subscribe({
      next: (response) => {
        this.game = response;
      },
      error: (error) => {
        this.alertService.alertError('Something is wrong');
      },
    });
  }

  submitContactForm() {
    this.alertService.openAlert({
      content: 'This title will be purchase soon...',
      type: 'success',
    });
  }
}
