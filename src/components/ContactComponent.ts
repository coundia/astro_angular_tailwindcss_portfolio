import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
	selector: "contact",
	standalone: true,
	template: `
    <div class="max-w-lg mx-auto p-6 bg-white  ">

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block font-medium">Name</label>
          <input type="text" formControlName="name" class="w-full border p-2 rounded-md" placeholder="Your Name" />
          <p *ngIf="contactForm.controls.name.invalid && contactForm.controls.name.touched" class="text-red-500 text-sm">
            Name is required.
          </p>
        </div>

        <div>
          <label class="block font-medium">Email</label>
          <input type="email" formControlName="email" class="w-full border p-2 rounded-md" placeholder="Your Email" />
          <p *ngIf="contactForm.controls.email.invalid && contactForm.controls.email.touched" class="text-red-500 text-sm">
            Valid email is required.
          </p>
        </div>

        <div>
          <label class="block font-medium">Message</label>
          <textarea formControlName="message" rows="4" class="w-full border p-2 rounded-md" placeholder="Your Message"></textarea>
          <p *ngIf="contactForm.controls.message.invalid && contactForm.controls.message.touched" class="text-red-500 text-sm">
            Message is required.
          </p>
        </div>

        <button type="submit" [disabled]="contactForm.invalid" class="w-full bg-primary text-white py-2 rounded-md">
          Send Message
        </button>
      </form>

      <p *ngIf="submitted" class="text-green-500 mt-4">Message sent successfully!</p>
    </div>
  `,
	imports: [ReactiveFormsModule, NgIf],
})
export class ContactComponent {
	contactForm = new FormGroup({
		name: new FormControl("", Validators.required),
		email: new FormControl("", [Validators.required, Validators.email]),
		message: new FormControl("", Validators.required),
	});

	submitted = false;

	onSubmit() {
		if (this.contactForm.valid) {
			console.log("Form Submitted", this.contactForm.value);
			this.submitted = true;
			this.contactForm.reset();
		}
	}
}
