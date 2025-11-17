import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button type="button">{{label}}</button>`
})
export class ButtonComponent {
  @Input() label = 'Clique moi';
}
