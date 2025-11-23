import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="app-shell">
      <div class="app-shell__content">
        <header class="app-shell__header">
          <h1 class="app-shell__title">Galactik Angular UI</h1>
          <p class="app-shell__subtitle">
            Minimal host shell for the Angular design-system components.
          </p>
        </header>
        <section class="app-shell__card">
          <p>
            This shell exists to make the Angular build succeed and to provide a landing page
            when serving the demo app. Components are exported via <code>src/index.ts</code>
            for library consumption.
          </p>
        </section>
      </div>
    </main>
  `,
  styleUrls: ['./app.scss']
})
export class App {}
