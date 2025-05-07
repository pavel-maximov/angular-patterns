import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app-container">
      <header>
        <h1>Angular Features Demo</h1>
        <nav>
          <a routerLink="/component" routerLinkActive="active">Component Demo</a>
          <a routerLink="/signal" routerLinkActive="active">Signal Demo</a>
        </nav>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>

      <footer>
        <p>Angular v19.2.0 Features Demonstration</p>
      </footer>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular Features Demo';
}
