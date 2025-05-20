import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMessageService } from '../services/user-message.service';
import { UserMessage } from '../models/user-message.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Table } from 'primeng/table';

// PrimeNG imports
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-user-messages',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    CardModule,
    TagModule,
    ToastModule,
    InputTextModule,
    RippleModule
  ],
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.scss'],
  providers: [MessageService]
})
export class UserMessagesComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  
  messages: UserMessage[] = [];
  loading = true;
  
  // Pagination settings
  first = 0;
  rows = 3;
  totalRecords = 0;

  constructor(
    private userMessageService: UserMessageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.userMessageService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.totalRecords = data.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load messages'
        });
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  markAsRead(message: UserMessage): void {
    if (message.isRead) return;
    
    this.userMessageService.markAsRead(message.id).subscribe({
      next: (updatedMessage) => {
        const index = this.messages.findIndex(m => m.id === updatedMessage.id);
        if (index !== -1) {
          this.messages[index] = updatedMessage;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message marked as read'
        });
      },
      error: (error) => {
        console.error('Error marking message as read:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to mark message as read'
        });
      }
    });
  }
  
  refresh(): void {
    this.loadMessages();
  }

  onGlobalFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }
} 