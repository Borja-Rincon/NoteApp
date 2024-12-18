import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { PhotoService } from '../services/photo.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {
  noteForm: FormGroup;
  capturedPhoto: string = "";

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private navController: NavController,
    private toastController: ToastController,
    private photoService: PhotoService
  ) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]], 
    });
  }

  ngOnInit() {}

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath? data.webPath : "";
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  async onSave() {
    if (this.noteForm.valid) {
      const noteData = this.noteForm.value;
      let blob = null;
      if(this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.noteService.createNote(noteData, blob).subscribe(
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
