import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleAnalyticsService } from './core/services/google-analytics-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private analytics = inject(GoogleAnalyticsService);
  protected readonly title = signal('netlifly-deploy-angular');

  constructor() {
    this.analytics.init();
  }
}
