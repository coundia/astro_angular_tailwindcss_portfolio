import { Component,type OnInit } from '@angular/core';
import { getCollection } from 'astro:content';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	standalone: true,
	imports: [
		// No need to import Angular Router components since we use Astro's routing system
	]
})
export class NavbarComponent implements OnInit {
	homeRt: string = '/';
	projectsRt: string = '/projects';
	skillsRt: string = '/skills';
	aboutRt: string = '/about';
	blogRt: string = '/blog';
	contactRt: string = '/contact';
	isBlogPopulated: boolean = false;

	fullName: string = 'Your Name';
	profilePicture: string = 'path_to_profile_picture';

	home: string = 'Home';
	projects: string = 'Projects';
	skills: string = 'Skills';
	about: string = 'About';
	contact: string = 'contact';
	blog: string = 'Blog';

	constructor() {}

	ngOnInit(): void {
		this.checkBlogCollection();
	}

	async checkBlogCollection() {
		const collection = await getCollection("blog");
		this.isBlogPopulated = collection.length > 0;
	}
}
