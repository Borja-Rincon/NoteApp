import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  endpoint = 'http://localhost:8080/api/notes'

  constructor(private httpClient: HttpClient) { }

  getNotes() {
    return this.httpClient.get(this.endpoint)
  }

  createNote(note: any) {
    return this.httpClient.post(this.endpoint, note);
  }

  getNoteByID(id: string) {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  updateNoteByID(id: string, note: any) {
    return this.httpClient.put(`${this.endpoint}/${id}`, note);
  }

  deleteNoteByID(id: string) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
