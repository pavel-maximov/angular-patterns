import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <h1>Hello World!</h1>
      <p>Welcome to {{title}}</p>
      <router-outlet />
    </div>
  `,
  styles: [`
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
  `],
})
export class AppComponent {
  title = 'angular-patterns-app';
}
