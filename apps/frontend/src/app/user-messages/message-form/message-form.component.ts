import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserMessageService } from '../../services/user-message.service';
import { MessageService } from 'primeng/api';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  providers: [MessageService]
})
export class MessageFormComponent {
  messageForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private userMessageService: UserMessageService,
    private messageService: MessageService
  ) {
    this.messageForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.maxLength(255)]]
    });
  }

  onSubmit(): void {
    if (this.messageForm.invalid || this.submitting) {
      return;
    }

    this.submitting = true;
    this.userMessageService.createMessage(this.messageForm.value).subscribe({
      next: () => {
        this.messageForm.reset();
        this.submitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message sent successfully'
        });
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.submitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send message'
        });
      }
    });
  }
} 