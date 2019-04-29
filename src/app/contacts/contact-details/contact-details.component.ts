import { Component, OnInit, Input } from '@angular/core';
import Contact from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contact: Contact;
  @Input() createHandler: Function;
  @Input() updateHandler: Function;
  @Input() deleteHandler: Function;
  
  constructor(private ContactService: ContactService) { }

  ngOnInit() {
  }
  createContact(contact: Contact) {
    
    this.ContactService.CreateContact(contact).subscribe((newContact) => {
      //this.createHandler(newContact);//bug
    })
  }
  updateContact(contact: Contact): void {
    this.ContactService.updateContact(contact).subscribe((updateContact) => {
      //this.updateHandler(updateContact);//bug
    })
  }
  deleteContact(contactId: String): void {
    
    this.ContactService.deleteContact(contactId).subscribe((deleteContact) => {
      //this.deleteHandler(deleteContact);//bug
    })
  }

}
