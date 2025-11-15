import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

declare var gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private router: Router = inject(Router);

  public init() {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=G-ZQE7QRCW30`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZQE7QRCW30', {'send_page_view': false});
    `;

    document.head.appendChild(script2);

    this.listenForRouteChanges();
  }

  public event(eventName: string, params: Record<string, any>) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  private listenForRouteChanges() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && typeof gtag === 'function') {
        gtag('config', 'G-ZQE7QRCW30', {
          page_path: event.urlAfterRedirects,
        });
        console.log('GA page view:', event.urlAfterRedirects);
      }
    });
  }
}
