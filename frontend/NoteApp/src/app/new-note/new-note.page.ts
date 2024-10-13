import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {
  noteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private navController: NavController,
    private toastController: ToastController
  ) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]], 
    });
  }

  ngOnInit() {}

  async onSave() {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;

      this.noteService.createNote(noteData).subscribe(
        async response => {
          const toast = await this.toastController.create({
            message: 'Nota creada exitosamente.',
            duration: 2000,
            color: 'success'
          });
          await toast.present();

          this.navController.pop();
        },
        error => {
          console.error('Error al crear la nota:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
