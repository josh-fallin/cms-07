import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentListChanged = new Subject<Document[]>();
  startedEditing = new Subject<number>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocument(id: string) {
    for (let i = 0; i < this.documents.length; i++)
    {
      if (this.documents[i].id === id) {
        return this.documents[i];
      }
    }
    return null;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach(function(document) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId;
  }

  addDocument(document: Document) {
    if (document == null) {
      return;
    }
    this.maxDocumentId++;
    document.id = '' + this.maxDocumentId;
    this.documents.push(document);
    this.documentListChanged.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, updatedDocument: Document) {
    if (originalDocument == null || updatedDocument == null) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    updatedDocument.id = originalDocument.id;
    this.documents[pos] = updatedDocument;
    this.documentListChanged.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (document === null) { return; }

    const pos = this.documents.indexOf(document);
    if (pos < 0) { return; }

    this.documents.splice(pos, 1);
    this.documentListChanged.next(this.documents.slice());
  }
  
}
