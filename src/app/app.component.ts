import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="container">
      <h1>Hello World!</h1>
      <p>Welcome to {{ title }}</p>
      <nav>
        <a routerLink="/">Home</a> |
        <a routerLink="/signal">Signal</a>
      </nav>
      <router-outlet />
    </div>
  `,
  styles: [
    `
      .container {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }

      h1 {
        color: #3f51b5;
      }

      nav {
        margin: 20px 0;
      }

      a {
        color: #3f51b5;
        margin: 0 10px;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-patterns-app';
}
