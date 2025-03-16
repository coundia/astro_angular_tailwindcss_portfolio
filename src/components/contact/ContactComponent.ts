import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
	selector: "contact",
	standalone: true,
	template: `
		<div class="w-full md:max-w-4xl mx-auto p-6  shadow-lg rounded-lg">
			<p class="text-gray-600 text-center mb-6">
				Je suis ravis de vous entendre! Envoyer vos questions,
				commentaires ou suggestions. Je vais vous répondre dans les plus brefs délais.
			</p>
			 
			
			<form  *ngIf="enabled_contact" [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
				<div class="flex gap-4 flex-col md:flex-row">
					<div class="w-full ">
						<label class="block font-medium">Nom et Prénom</label>
						<input
								type="text"
								formControlName="name"
								class="w-full border p-2 rounded-md focus:ring focus:ring-primary focus:outline-none"
								placeholder="Votre Nom"
						/>
					</div>
					<div class="w-full ">
						<label class="block font-medium">Email</label>
						<input
								type="email"
								formControlName="email"
								class="w-full border p-2 rounded-md focus:ring focus:ring-primary focus:outline-none"
								placeholder="Votre Email"
						/>
					</div>
				</div>

				<div>
					<label class="block font-medium ">Message *</label>
					<textarea
							formControlName="message"
							rows="6"
							class="w-full border p-2 rounded-md focus:ring focus:ring-primary focus:outline-none"
							placeholder="Votre message"
					></textarea>
					<p *ngIf="contactForm.controls.message.invalid && contactForm.controls.message.touched" class="text-red-500 text-sm">
						Le message est requis.
					</p>
				</div>

				<button
						type="submit"
						[disabled]="contactForm.invalid || loading"
						class="btn btn-primary btn-sm self-center justify-self-center px-4"
				>
					<span *ngIf="loading" class="animate-spin border-2 border-t-transparent rounded-full w-5 h-5"></span>
					<span>{{ loading ? "Envoi en cours..." : "Envoyer le message" }}</span>
				</button>
			</form>

			<p *ngIf="submitted" class="text-green-600 text-center mt-6">✅ Votre message a été envoyé avec succès !</p>
		</div>
	`,
	imports: [ReactiveFormsModule, NgIf],
})
export class ContactComponent {
	contactForm = new FormGroup({
		name: new FormControl("", ),
		email: new FormControl("", [Validators.email]),
		message: new FormControl("", Validators.required),
	});

	submitted = false;
	loading = false;
	enabled_contact = false;

	onSubmit() {
		if (this.contactForm.valid) {
			this.loading = true;

			setTimeout(() => {
				console.log("Form Submitted", this.contactForm.value);
				this.submitted = true;
				this.loading = false;
				this.contactForm.reset();
			}, 2000);
		}
	}
}