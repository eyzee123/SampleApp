import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bet-modal',
  templateUrl: './bet-modal.component.html',
  styleUrls: ['./bet-modal.component.scss'],
})
export class BetModalComponent implements OnInit {
    amountInput = new FormControl('',Validators.required);
  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();

  }

}
