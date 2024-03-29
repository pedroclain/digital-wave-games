import { Component, OnInit } from '@angular/core';
import {
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
import { LoadingBarComponent } from '../../components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GameCardComponent,
    LoadingBarComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  games: Game[] | null = null;
  categories: Category[] = [];
  platforms: Platform[] = [];

  PAGE_SIZE = 6;
  MAX_BUTTON_PAGES = 3;

  search = '';
  currentPage = 0;
  lastPage = 0;
  numberOfButtonPages = 0;
  pageButtons: number[] = [];

  filterMenuStatus: null | string = null;
  filterForm = this.formBuilder.group({
    name: ['', Validators.required],
    orderBy: ['', Validators.required],
    priceFrom: [null, Validators.required],
    priceTo: [null, Validators.required],
    categories: [null, CustomValidators.arrayMinLength(1)],
    platforms: [null, CustomValidators.arrayMinLength(1)],
  });
  filters: PaginateType = {
    page: this.currentPage,
    size: this.PAGE_SIZE,
  };

  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.findPaginate();

    this.gameService.findCategories().subscribe((response) => {
      this.categories = response;
    });
    this.gameService.findPlatforms().subscribe((response) => {
      this.platforms = response;
    });
  }

  findPaginate() {
    this.games = null;
    this.gameService.findPaginate(this.filters).subscribe((response) => {
      this.games = response.games;
      this.lastPage = response.lastPage;
      this.numberOfButtonPages = this.lastPage > this.MAX_BUTTON_PAGES ? this.MAX_BUTTON_PAGES : this.lastPage + 1;
      this.definePageButton();
    });
  }

  filterClickHandler() {
    this.filterForm.controls.name.patchValue('');
    this.applyFilters();
    this.switchFiltersMenu();
  }

  clearClickHandler() {
    this.filterForm.patchValue({
      name: '',
      orderBy: '',
      priceFrom: null,
      priceTo: null,
      categories: null,
      platforms: null,
    });
    this.applyFilters();
    this.switchFiltersMenu();
  }

  searchClickHandler() {
    this.applyFilters();
  }

  applyFilters() {
    this.currentPage = 0;
    this.buildGamesApiFilters();
    this.findPaginate();
  }

  switchFiltersMenu() {
    this.filterMenuStatus === 'open'
      ? (this.filterMenuStatus = 'close')
      : (this.filterMenuStatus = 'open');
  }

  buildGamesApiFilters() {
    this.filters = {
      page: 0,
      size: this.PAGE_SIZE,
      filter: {
        name: this.filterForm.controls.name.valid
          ? this.filterForm.value.name!
          : undefined,
        categories: this.filterForm.controls.categories.valid
          ? this.filterForm.value.categories!
          : undefined,
        platforms: this.filterForm.controls.platforms.valid
          ? this.filterForm.value.platforms!
          : undefined,
        price: {
          from: this.filterForm.controls.priceFrom.valid
            ? this.filterForm.value.priceFrom!
            : undefined,
          to: this.filterForm.controls.priceTo.valid
            ? this.filterForm.value.priceTo!
            : undefined,
        },
      },
      orderBy: this.filterForm.controls.orderBy.valid
        ? this.filterForm.value.orderBy!
        : undefined,
    };
  }

  updateCurrentPage(newPage: number) {
    this.currentPage = newPage;
    this.filters.page = newPage;
    this.findPaginate();
  }

  nextPage() {
    if (this.canNext()) {
      this.updateCurrentPage(this.currentPage + 1);
    }
  }

  canNext() {
    return this.currentPage < this.lastPage;
  }

  prevPage() {
    if (this.canPrev()) {
      this.updateCurrentPage(this.currentPage - 1);
    }
  }

  canPrev() {
    return this.currentPage > 0;
  }

  definePageButton() {
    this.pageButtons = [];
    const n = this.currentPage;
    const y = this.lastPage;
    const s = Math.ceil(this.numberOfButtonPages / 2);
    const h = y - n < s ? s - (y - n) : 0;

    for (let i = s + h - 1; i >= 0; i--)
      if (n - i >= 0) this.pageButtons.push(n - i);
    for (let i = 1; this.pageButtons.length < this.numberOfButtonPages; i++)
      this.pageButtons.push(n + i);
  }
}
