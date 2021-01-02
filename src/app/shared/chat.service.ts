import { Injectable } from '@angular/core';
import { Chat } from '../shared/Chat';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatListRef:AngularFireList<any>;
  chatRef:AngularFireObject<any>;
  constructor(private db:AngularFireDatabase) {


  }
  createChat(apt: Chat) {
    this.chatListRef = this.db.list('/chat');
   return this.chatListRef.push({
    sender: apt.sender,
    receiver: apt.receiver,
    message: apt.message,
    status: apt.status,
    created: apt.created
   })
 }

 // Get Single
 getChat(id: string) {
   this.chatRef = this.db.object('/chat/' + id);
   return this.chatRef;
 }

 // Get List
 getChatList() {
   this.chatListRef = this.db.list('/chat');
   return this.chatListRef;
 }

 // Update
 updateChat(id, apt: Chat) {
   return this.chatRef.update({
    sender: apt.sender,
    receiver: apt.receiver,
    message: apt.message,
    status: apt.status,
    created: apt.created
   })
 }

 // Delete
 deleteChat(id: string) {
   this.chatRef = this.db.object('/chat/' + id);
   this.chatRef.remove();
 }
}