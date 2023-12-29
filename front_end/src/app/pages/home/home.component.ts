import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GameCardComponent } from './game-card/game-card.component';
import { GameService, PaginateType } from '../../services/game.service';
import { Game } from '../../models/game.model';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category';
import { Platform } from '../../models/platform.model';
import { CustomValidators } from '../../validators/custom.validator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, GameCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  search = '';
  games: Game[] | null = null;
  categories: Category[] = [];
  platforms: Platform[] = [];
  filterMenuStatus: null | string = null;
  filterForm = this.formBuilder.group({
    orderBy: ['', Validators.required],
    priceFrom: [null, Validators.required],
    priceTo: [null, Validators.required],
    categories: [[], CustomValidators.arrayMinLength(1)],
    platforms: [[], CustomValidators.arrayMinLength(1)],
  });

  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gameService
      .findPaginate({
        page: 0,
        size: 10,
      })
      .subscribe((response) => (this.games = response));

    this.gameService.findCategories().subscribe((response) => {
      this.categories = response;
    });
    this.gameService.findPlatforms().subscribe((response) => {
      this.platforms = response;
    });
  }

  applyFilters() {
    const filters: PaginateType = {
      page: 0,
      size: 10,
      filter: {
        categories: this.filterForm.controls.categories.valid ? this.filterForm.value.categories! : undefined,
        platforms: this.filterForm.controls.platforms.valid ? this.filterForm.value.platforms! : undefined,
        price: {
          from: this.filterForm.controls.priceFrom.valid ? this.filterForm.value.priceFrom! : undefined,
          to: this.filterForm.controls.priceTo.valid ? this.filterForm.value.priceTo! : undefined,
        }
      },
      orderBy: this.filterForm.controls.orderBy.valid ? this.filterForm.value.orderBy! : undefined
    };

    this.gameService
      .findPaginate(filters)
      .subscribe((response) => (this.games = response));

    this.switchProfileMenu();
  }

  switchProfileMenu() {
    this.filterMenuStatus === 'open'
      ? (this.filterMenuStatus = 'close')
      : (this.filterMenuStatus = 'open');
  }
}
