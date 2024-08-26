import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss'],
})
export class LicensesComponent {

  constructor(
    private modalController: ModalController
  ) { }

  closeModal() {
    this.modalController.dismiss();
  }

}
