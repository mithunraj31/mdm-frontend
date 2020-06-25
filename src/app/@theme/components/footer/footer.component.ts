import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Powered by <b><a href="https://www.mbel.co.jp/" target="_blank">Mitsui Bussan Electronics Ltd.</a></b> 2020</span>
    <div class="socials">
    </div>
  `,
})
export class FooterComponent {
}
