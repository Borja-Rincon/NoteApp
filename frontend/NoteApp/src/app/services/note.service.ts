import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  endpoint = 'http://localhost:8080/api/notes'

  constructor(private httpClient: HttpClient) { }

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  private createAuthHeaders() {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getNotes(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.httpClient.get(this.endpoint, { headers });
  }

  createNote(note: any, blob: any): Observable<any> {
    const headers = this.createAuthHeaders();
    let formData = new FormData();
    formData.append("title", note.title);
    formData.append("description", note.description);
    formData.append("file", blob);

    return this.httpClient.post(this.endpoint, formData, { headers });
  }

  getNoteByID(id: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.httpClient.get(`${this.endpoint}/${id}`, { headers });
  }

  updateNoteByID(id: string, note: any, blob: any = null): Observable<any> {
    const headers = this.createAuthHeaders();
    let formData = new FormData();
    formData.append("title", note.title);
    formData.append("description", note.description);
    if (blob) {
      formData.append("file", blob);
    }

    return this.httpClient.put(`${this.endpoint}/${id}`, formData, { headers });
  }

  deleteNoteByID(id: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.httpClient.delete(`${this.endpoint}/${id}`, { headers });
  }
}