import { Component,type OnInit } from '@angular/core';

@Component({
	selector: 'app-theme-toggle',
	templateUrl: './theme-toggle.component.html',
	standalone: true
})
export class ThemeToggleComponent implements OnInit {
	theme: string = 'light';

	constructor() {}

	ngOnInit(): void {
		this.theme = this.getTheme();
		this.applyTheme();
	}

	toggleTheme(): void {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', this.theme);
		}
		this.applyTheme();
	}


	private getTheme(): string {
		if (typeof window === 'undefined') return 'light';
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme === 'dark' || storedTheme === 'light') {
			return storedTheme;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}


	private applyTheme(): void {
		if (typeof document !== 'undefined') {
			const root = document.documentElement;
			this.theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
		}
	}

}
