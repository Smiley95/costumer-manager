import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ClientService } from '../../shared/client.service';
import { StateService } from '../../shared/state.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private service: ClientService,
    private stateService: StateService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ClientComponent>) { }


  ngOnInit() {
    this.service.getClients();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
    
  }
  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value)
        this.service.insertClient(this.service.form.value);
      else
        this.service.updateClient(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
      
    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}