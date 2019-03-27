import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component'
import Contact from '../contact';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(Contacts => this.contacts = Contacts);
  }
  selectContact(contact: Contact):void  {
    this.selectedContact = contact;
  }
  private getIndexOfContact =(contactId: String)=>{
    return this.contacts.findIndex((contact)=>{
      return contact._id ===contactId;
    })
  }
  createNewContact():void {
    var contact: Contact = {
      name: "",
      email: "",
      phone: {
        work: "",
        mobile: ""
      }
    };
    this.selectContact(contact);
    
  };
  deleteContact =(contactId:String)=>{
    var idx =this.getIndexOfContact(contactId);
    if(idx!==-1)
    {
      this.contacts.splice(idx,1);
      this.selectContact(null);
    }
    return this.contacts;
  }
  addContact =(contact :Contact)=>{
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }
  updateContact=(contact :Contact)=>{
    var idx=this.getIndexOfContact(contact._id);
    if(idx !==-1){
      this.contacts[idx]=contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }
}
