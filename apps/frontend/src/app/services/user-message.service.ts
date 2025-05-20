import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMessage } from '../models/user-message.model';

@Injectable({
  providedIn: 'root'
})
export class UserMessageService {
  private apiUrl = '/api/user-messages';
  
  constructor(private http: HttpClient) {}
  
  getMessages(): Observable<UserMessage[]> {
    return this.http.get<UserMessage[]>(this.apiUrl);
  }
  
  getMessage(id: string): Observable<UserMessage> {
    return this.http.get<UserMessage>(`${this.apiUrl}/${id}`);
  }
  
  createMessage(message: Omit<UserMessage, 'id' | 'isRead' | 'createdAt' | 'updatedAt'>): Observable<UserMessage> {
    return this.http.post<UserMessage>(this.apiUrl, message);
  }
  
  markAsRead(id: string): Observable<UserMessage> {
    return this.http.put<UserMessage>(`${this.apiUrl}/${id}/read`, {});
  }
} 