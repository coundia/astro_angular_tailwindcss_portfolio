import { Component, Input,type OnInit } from '@angular/core';

@Component({
	selector: 'app-animated-text',
	templateUrl: './animated-text.component.html',
	standalone: true,

})
export class AnimatedTextComponent implements OnInit {
	@Input() text: string = '';
	@Input() timer: number = 200;
	displayedText: string = '';
	private words: string[] = [];
	private index = 0;

	ngOnInit() {
		this.words = this.text.split(' '); // Découpe en mots
		this.displayNextWord();
	}

	displayNextWord() {
		if (this.index < this.words.length) {
			this.displayedText += (this.index > 0 ? ' ' : '') + this.words[this.index];
			this.index++;
			setTimeout(() => this.displayNextWord(), this.timer);
		}
	}
}
