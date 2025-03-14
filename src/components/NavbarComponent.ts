import {Component, type OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { getCollection } from 'astro:content'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	standalone: true,
	imports: [
		RouterLink
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
	contact: string = 'Contact';
	blog: string = 'Blog';

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.checkBlogCollection();
	}

	async checkBlogCollection() {
		const collection = await getCollection("BlogPosts");
		this.isBlogPopulated = collection.length > 0;
	}
}
