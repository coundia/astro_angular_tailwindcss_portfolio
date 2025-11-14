import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http'

@Component({
	selector: 'remove-my-data',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
	template: `
		<div class="w-full max-w-xl mx-auto p-6 rounded-2xl shadow bg-base-100">
			<h3 class="text-2xl font-semibold text-center mb-4">Supprimer mes données</h3>

			@if (!done) {
				<form [formGroup]="form" (ngSubmit)="requestCode()" class="flex flex-col gap-3">
					<input class="input input-bordered w-full" placeholder="Email" formControlName="email" type="email" />
					<input class="input input-bordered w-full" placeholder="Téléphone" formControlName="phone" type="tel" />
					<input class="input input-bordered w-full" placeholder="Nom d’utilisateur" formControlName="username" />
					<button class="btn btn-primary self-end" type="submit" [disabled]="formInvalid || loading">
						@if (loading && step===1) { <span class="loading loading-spinner loading-sm"></span> } @else { Recevoir le code }
					</button>
				</form>

				@if (step===2) {
					<form [formGroup]="formCode" (ngSubmit)="removeData()" class="mt-6 flex flex-col gap-3">
						<input class="input input-bordered w-full" placeholder="Code reçu" formControlName="code" />
						<textarea class="textarea textarea-bordered w-full" rows="4" placeholder="Notes (optionnel)" formControlName="notes"></textarea>

						<label class="flex items-center gap-2 text-sm">
							<input type="checkbox" formControlName="confirm" class="checkbox checkbox-error" />
							<span>Je confirme que je souhaite supprimer définitivement mes données.</span>
						</label>

						<button class="btn btn-error self-end" type="submit" [disabled]="formCode.invalid || loading">
							@if (loading && step===2) { <span class="loading loading-spinner loading-sm"></span> } @else { Confirmer la suppression }
						</button>
					</form>
				}

				@if (error) { <p class="text-sm text-error mt-3">{{ error }}</p> }
				@if (ok && step===1) { <p class="text-sm text-success mt-3">Code envoyé. Vérifiez vos messages.</p> }
			}

			@if (done) { <p class="text-success text-center">Vos données ont été supprimées.</p> }
		</div>
	`
})
export class RemoveMyDataComponent {
	@Input() baseUrl = 'https://cloud.megastore.sn'
	@Input() requestPath = '/api/auth/request-code'
	@Input() removePath = '/api/auth/remove-my-data'

	@Input() token = ''
	@Input() source = ''
	@Input() status = 'INITIATED'
	@Input() notesDefault = ''

	@Output() completed = new EventEmitter<unknown>()
	@Output() failed = new EventEmitter<unknown>()

	private fb = inject(FormBuilder)
	private http = inject(HttpClient)

	form = this.fb.group({
		email: ['', [Validators.email]],
		phone: [''],
		username: ['']
	})

	formCode = this.fb.group({
		code: ['', [Validators.required, Validators.minLength(3)]],
		notes: [''],
		confirm: [false, Validators.requiredTrue]
	})

	step = 1
	loading = false
	error = ''
	ok = false
	done = false

	get formInvalid() {
		const v = this.form.value
		return !v.email && !v.phone && !v.username
	}

	private headers() {
		return new HttpHeaders({ Accept: '*/*', 'Content-Type': 'application/json' })
	}

	private expIn(minutes: number) {
		const d = new Date(Date.now() + minutes * 60000)
		return d.toISOString()
	}

	requestCode() {
		if (this.formInvalid || this.loading) return
		this.loading = true
		this.error = ''
		this.ok = false

		const v = this.form.value
		const body = {
			notes: this.formCode.value.notes || this.notesDefault,
			token: this.token,
			username: v.username || '',
			phone: v.phone || '',
			email: v.email || '',
			code: '',
			status: this.status,
			source: this.source,
			expiration: this.expIn(10)
		}

		this.http.post(`${this.baseUrl}${this.requestPath}`, body, {
			headers: this.headers(),
			withCredentials: false
		}).subscribe({
			next: r => {
				this.loading = false
				this.ok = true
				this.step = 2
			},
			error: (e: HttpErrorResponse) => {
				this.loading = false
				this.error = e?.error?.message || e?.statusText || 'Erreur lors de l’envoi du code.'
				this.failed.emit(e)
			}
		})
	}

	removeData() {
		if (this.formCode.invalid || this.loading) return
		this.loading = true
		this.error = ''

		const v = this.form.value
		const c = this.formCode.value
		const body = {
			notes: c.notes || this.notesDefault,
			token: this.token,
			username: v.username || '',
			phone: v.phone || '',
			email: v.email || '',
			code: c.code || '',
			status: this.status,
			source: this.source,
			expiration: this.expIn(5)
		}

		this.http.post(`${this.baseUrl}${this.removePath}`, body, {
			headers: this.headers(),
			withCredentials: false
		}).subscribe({
			next: r => {
				this.loading = false
				this.done = true
				this.completed.emit(r)
			},
			error: (e: HttpErrorResponse) => {
				this.loading = false
				if (e.status === 404) {
					this.error = 'Code invalide ou expiré.'
				} else {
					this.error = e?.error?.message || e?.statusText || 'Erreur lors de la suppression.'
				}
				this.failed.emit(e)
			}
		})
	}
}
