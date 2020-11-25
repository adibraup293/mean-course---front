import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-manager-registerTestOfficer',
  templateUrl: './record-officer.component.html',
  styleUrls: ['./record-officer.component.css']
})

export class ManagerRecordTestOfficerComponent {
  constructor(public authService: AuthService){}

  onCreateTCOProfile(form: NgForm){
    if (form.invalid){
      return;
    }
    this.authService.createUser(form.value.username, form.value.password, form.value.name, "Tester");
  }
}
