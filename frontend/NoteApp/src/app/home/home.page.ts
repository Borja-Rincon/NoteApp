import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  notes: any = []

  constructor(private router: Router, private noteServices: NoteService) {}

  ngOnInit() {
    this.getAllNotes();
  }

  ionViewWillEnter() {
    this.getAllNotes();
  }

  onAddButtonClick() {
    this.router.navigate(['/new-note']);
  }

  goToNoteDetails(note: any) {
    this.router.navigate(['/note-details', { id: note.id }]);
  }

  getAllNotes() {
    this.noteServices.getNotes().subscribe(response => {
      this.notes = response;
    });
  }
}