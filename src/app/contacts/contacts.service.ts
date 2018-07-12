import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactListChanged = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContact(id: string) 
  {
    for(let i = 0; i < this.contacts.length; i++) {
      if(this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
    return null;
  }

  getContacts() {
    return this.contacts.slice();
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(function(contact) {
      let currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    })
    return maxId;
  }

  addContact(contact: Contact) {
    if (contact == null) {
      return;
    }
    this.maxContactId++;
    contact.id = '' + this.maxContactId;
    this.contacts.push(contact);
    this.contactListChanged.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, updatedContact: Contact) {
    if (originalContact === null || updatedContact === null) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    updatedContact.id = originalContact.id;
    this.contacts[pos] = updatedContact;
    this.contactListChanged.next(this.contacts.slice());
  }

  deleteContact(contact: Contact) {
    if (contact === null) { return; }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) { return; }

    this.contacts.splice(pos, 1);
    this.contactListChanged.next(this.contacts.slice());
  }

}
