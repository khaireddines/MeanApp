import { Injectable } from '@angular/core';
import Contact from './contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsUrl = 'http://localhost:3000/api/contacts';
  
  constructor(private http: HttpClient) { }
  //get("/api/contacts")
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }
  //post("/api/contacts")
  CreateContact(newContact: Contact): Observable<Contact[]> {
    console.log(newContact);
    return this.http.post<Contact[]>(this.contactsUrl, newContact);
  }
  //get("/api/contacts/:id")
  getContact(id: String): Observable<Contact[]> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact[]>(url);
  }
  //put("/api/contacts/:id")
  updateContact(updateContact: Contact): Observable<Contact[]> {
    const url = `${this.contactsUrl}/${updateContact._id}`;
    return this.http.put<Contact[]>(url, updateContact);
  }
  //delete("/api/contacts/:id")
  deleteContact(id: String):Observable<Contact[]>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<Contact[]>(url);
  }

}


