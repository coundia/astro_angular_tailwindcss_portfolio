import { Component } from '@angular/core';

@Component({
	selector: 'app-lang-switcher',
	standalone: true,
	template: `
    <label class="grid cursor-pointer place-items-center swap swap-rotate">
      <input type="checkbox" id="lang-toggle" [checked]="isFrench" (change)="toggleLanguage()" class="lang-controller" />
      <div class="swap-on">🇫🇷</div>
      <div class="swap-off">🇺🇸</div>
    </label>
  `,
	styles: [
		`
      .swap-on, .swap-off {
        font-size: 2rem;
        transition: transform 0.3s;
      }
      .swap-on {
        transform: rotate(0deg);
      }
      .swap-off {
        transform: rotate(180deg);
      }
    `,
	],
})
export class LangSwitcherComponent {
	isFrench: boolean = true;

	toggleLanguage() {
		const newLang = this.isFrench ? 'en' : 'fr';
		this.isFrench = !this.isFrench;

		document.documentElement.lang = newLang;

		const newUrl = window.location.pathname.replace(`/${document.documentElement.lang === 'fr' ? 'en' : 'fr'}/`, `/${newLang}/`);
		window.history.pushState({}, '', newUrl);
	}
}
