import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css',
})
export class GameDetails {
  invalidFields: Set<string> = new Set();
  game: Game | null = null;

  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new  FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
  });

  constructor(private gameService: GameService, private loadingService: LoadingService) {}

  @Input()
  set id(id: number) {
    this.loadingService.openLoading();
    this.gameService.findById(id).subscribe({
      next: (response) => {
        this.game = response;
        this.loadingService.closeLoading();
      },
      error: (err: HttpErrorResponse) => {
        alert('error' + err.status)
      }
    });
  }

  submitContactForm() {
    alert('Enviando formulário..');
    this.contactForm.patchValue({
      email: '',
      firstName: '',
      lastName: '',
      phone: ''
    })
  }
}
