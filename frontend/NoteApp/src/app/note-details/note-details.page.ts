import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from '../services/note.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage implements OnInit {

  note: any = {};
  isModified = false;

  constructor(
    private route: ActivatedRoute,
    private noteServices: NoteService,
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController
  ) {}

  ngOnInit() {

    const noteId = this.route.snapshot.paramMap.get('id');
    
    if (noteId) {
      this.getNoteByID(noteId);
    }
  }

  getNoteByID(id: string) {
    this.noteServices.getNoteByID(id).subscribe(response => {
      this.note = response;
    });
  }

  onFieldChange() {
    this.isModified = true;
  }

  async updateNote() {
    this.noteServices.updateNoteByID(this.note.id, this.note).subscribe(async response => {
      this.isModified = false;

      const toast = await this.toastController.create({
        message: 'Se ha actualizado la nota',
        duration: 2000,
        color: 'success'
      });

      await toast.present();

      this.navController.pop()
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

    await alert.present();  // Mostrar el alert
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
