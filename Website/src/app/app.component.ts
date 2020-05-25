import { Component, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Website';

  constructor(@Inject(LOCALE_ID) protected localeId: string) {
    console.log('current LocalID is: ' + localeId)
    console.log('navigator.language is ' + navigator.language) //THIS DETEC BROWSER LANGUAGES

  }
}
