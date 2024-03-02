import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.css'
})
export class LoadingBarComponent {
  @Input() open = false;
}
