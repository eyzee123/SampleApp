import { Injectable } from '@angular/core';
import { BetPLaced } from '../shared/BetPLaced';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BetplacedService {
  betListRef:AngularFireList<any>;
  betRef:AngularFireObject<any>;

  constructor(private db:AngularFireDatabase) {


   }
   createBet(apt: BetPLaced) {
    return this.betListRef.push({
      bet_id: apt.bet_id,
      team1: apt.team1,
      team2: apt.team2
    })
  }

  // Get Single
  getBet(id: string) {
    this.betRef = this.db.object('/betplaced/' + id);
    return this.betRef;
  }

  // Get List
  getBetList() {
    this.betListRef = this.db.list('/betplaced');
    return this.betListRef;
  }

  // Update
  updateBet(id, apt: BetPLaced) {
    return this.betRef.update({
      bet_id: apt.bet_id,
      team1: apt.team1,
      team2: apt.team2
    })
  }

  // Delete
  deleteBet(id: string) {
    this.betRef = this.db.object('/betplaced/' + id);
    this.betRef.remove();
  }
}
