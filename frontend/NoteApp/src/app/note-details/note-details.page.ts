import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';
import { PhotoService } from '../services/photo.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage implements OnInit {

  note: any = {};
  isModified = false;
  capturedPhoto: string = "";

  constructor(
    private route: ActivatedRoute,
    private noteServices: NoteService,
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController,
    private photoService: PhotoService
  ) {}

  ngOnInit() {

    const noteId = this.route.snapshot.paramMap.get('id');
    
    if (noteId) {
      this.getNoteByID(noteId);
    }
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath? data.webPath : "";
      this.isModified = true;
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      console.log("data: ", data.webPath); 
      this.capturedPhoto = data.webPath;
      this.isModified = true;
    });
  }

  getNoteByID(id: string) {
    this.noteServices.getNoteByID(id).subscribe(response => {
      this.note = response;
      
      if (this.note.filename) {
        this.note.imageUrl = `http://localhost:8080/images/${this.note.filename}`;
      }
    });
  }

  onFieldChange() {
    this.isModified = true;
  }

  async updateNote() {
    const updatedNote = {
      title: this.note.title,
      description: this.note.description,
    };

    let imageBlob: any = null;
    if (this.capturedPhoto != "") {
      const response = await fetch(this.capturedPhoto);
      imageBlob = await response.blob();
    }

    this.noteServices.updateNoteByID(this.note.id, updatedNote, imageBlob).subscribe(async response => {
      this.isModified = false;

      const toast = await this.toastController.create({
        message: 'Se ha actualizado la nota',
        duration: 2000,
        color: 'success'
      });

      await toast.present();
      this.navController.pop();
    });
  }

  async presentDeleteAlert() {

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Está seguro de que desea eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        }, {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            this.deleteNote();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteNote() {
    this.noteServices.deleteNoteByID(this.note.id).subscribe(
      async response => {
        const toast = await this.toastController.create({
          message: 'Se ha eliminado la nota.',
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        this.navController.pop()
    });
  }
}
