import { Component, type OnInit } from '@angular/core';
import {NgClass} from "@angular/common";
import {ThemeToggleComponent} from "@/components/theme/ThemeToggleComponent.ts";
import {LangSwitcherComponent} from "@/components/langSwitcher/LangSwitcherComponent.ts";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	imports: [
		NgClass,
		ThemeToggleComponent,
		LangSwitcherComponent
	],
	standalone: true
})
export class NavbarComponent implements OnInit {
	homeRt: string = '/';
	projectsRt: string = '/projects';
	aboutRt: string = '/about';
	blogRt: string = '/blog/1';
	contactRt: string = '/contact';

	fullName: string = "";
	profilePicture: string = '/coundia.png';

	home: string = 'Accueil';
	projects: string = 'Projets';
	about: string = 'A propos';
	contact: string = 'Contact';
	blog: string = 'Blog';

	constructor() {}

	ngOnInit(): void {}

	isActive(route: string): boolean {
		if (typeof window === 'undefined') {
			return false;
		}

		var real_path: string | undefined = window.location.pathname;

		if (real_path.includes("blog")) {
			  real_path = "/blog/1"
		}

		return route === real_path;
	}
}
