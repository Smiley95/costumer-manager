import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firebase: AngularFireDatabase) { }

  clientList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl(''),
    city: new FormControl(''),
    stateName: new FormControl(''),
    gender: new FormControl(''),
    total: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      stateName: '',
      address: '',
      total: 159
    });
  }

  getClients() {
    this.clientList = this.firebase.list('clients');
    return this.clientList.snapshotChanges();
  }
  insertClient(client) {
    this.clientList.push({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      mobile: client.mobile,
      city: client.city,
      gender: client.gender,
      stateName: client.stateName,
      address: client.address,
      total: 158
    });
  }

  updateClient(client) {
    this.clientList.update(client.$key,
      {
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        mobile: client.mobile,
        city: client.city,
        gender: client.gender,
        stateName: client.stateName,
        address: client.address,
        total: 148
      });
  }

  deleteClient($key: string) {
    this.clientList.remove($key);
  }
  populateForm(client) {
    this.form.setValue(_.omit(client,'state'));
  }
}