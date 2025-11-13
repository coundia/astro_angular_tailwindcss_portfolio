// src/components/contact/WhitelistJoinComponent.ts
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http'

@Component({
	selector: 'whitelist-join',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
	template: `
		<div class="w-full max-w-xl mx-auto p-6 rounded-2xl shadow bg-base-100">
			<h3 class="text-2xl font-semibold text-center mb-4">{{ title }}</h3>

			@if (!submitted) {
				<form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-3">
					<input
							formControlName="contact"
							type="text"
							class="input input-bordered w-full"
							placeholder="Email ou téléphone"
							autocomplete="email"
					/>
					@if (enableMessage) {
						<textarea
								formControlName="message"
								rows="5"
								class="textarea textarea-bordered w-full"
								placeholder="Votre message (optionnel)"
						></textarea>
					}
					<button type="submit" class="btn btn-primary self-end" [disabled]="form.invalid || loading">
						@if (loading) { <span class="loading loading-spinner loading-sm"></span> } @else { Envoyer }
					</button>
				</form>

				@if (form.controls.contact.touched && form.controls.contact.invalid) {
					<p class="text-sm text-error mt-2">Contact requis</p>
				}
				@if (error) {
					<p class="text-sm text-error mt-2">{{ error }}</p>
				}
			}

			@if (submitted) {
				<p class="text-success text-center">Merci, bien reçu, nous vous revenons.</p>
			}
		</div>
	`
})
export class WhitelistJoinComponent {
	@Input() apiUrl = 'https://cloud.megastore.sn/api/public/messages'
	@Input() code = 'jayko-whitelist'
	@Input() plateforme = 'jayko'
	@Input() source = ''
	@Input() agent = ''
	@Input() status = 'INITIATED'
	@Input() content = 'Demande'
	@Input() description = 'Formulaire site'
	@Input() title = 'Participez aux tests de Jaayko (Inscription à la whitelist)'
	@Input() enableMessage = false

	@Output() completed = new EventEmitter<unknown>()
	@Output() failed = new EventEmitter<unknown>()

	form = new FormGroup({
		contact: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
		message: new FormControl<string>('', { nonNullable: true })
	})

	loading = false
	submitted = false
	error = ''

	constructor(private http: HttpClient) {}

	private uuid() {
		try { return (globalThis as any)?.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}` } catch { return `${Date.now()}-${Math.random()}` }
	}

	onSubmit() {
		if (this.form.invalid || this.loading) return
		this.loading = true
		this.error = ''

		const contact = String(this.form.value.contact || '').trim()
		const message = String(this.form.value.message || '').trim()
		const now = new Date().toISOString()

		const payload = {
			code: this.code,
			email: contact,
			phone: contact,
			content: message || this.content,
			plateforme: this.plateforme,
			source: this.source,
			agent: this.agent,
			status: this.status,
			description: this.description,
			isActive: true,
			isDefault: true,
			remoteId: this.uuid(),
			localId: this.uuid(),
			depotAt: now,
			syncAt: now
		}

		const headers = new HttpHeaders({ Accept: '*/*', 'Content-Type': 'application/json' })

		this.http.post(this.apiUrl, payload, { headers, withCredentials: false }).subscribe({
			next: r => {
				this.submitted = true
				this.loading = false
				this.completed.emit(r)
				this.form.reset()
			},
			error: (e: HttpErrorResponse) => {
				this.loading = false
				this.error = e?.error?.message || e?.statusText || 'Erreur'
				this.failed.emit(e)
			}
		})
	}
}
