import {Component, Input} from "@angular/core";


@Component({
	selector: "contact",
	standalone: true,
	template: `
	Hello {{name}}
	`
})
export  class ContactComponent {

	@Input() name: string = "Hi" ;
	email: string = "";
	message: string = "";

}