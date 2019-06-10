import { Component, OnInit,ViewChild } from '@angular/core';
import { ClientService } from '../../shared/client.service';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { StateService } from '../../shared/state.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ClientComponent } from './../client/client.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from '../../shared/dialog.service';


import * as _ from 'lodash';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(private service: ClientService,
    private stateService: StateService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['firstName','lastName','address', 'email','city', 'stateName','totalAmmount','actions'];
    
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string;
    ngOnInit() {
      this.service.getClients().subscribe(
        list => {
          let array = list.map(item => {
            let stateName = this.stateService.getStateName(item.payload.val()['state']);
            return {
              $key: item.key,
              address: item.payload.val()['address'],
              city: item.payload.val()['city'],
              firstName: item.payload.val()['firstName'],
              gender: item.payload.val()['gender'],
              lastName: item.payload.val()['lastName'],
              mobile: item.payload.val()['mobile'],
              email: item.payload.val()['email'],
              total: item.payload.val()['total'],
              stateName
            };
          });
          console.log("the array");
         console.log(array);
          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter: string) => {
            return this.displayedColumns.some(ele => {
              if(data && data[ele]){
              return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
              }
            });
          };
        });
        
    }
  
    onSearchClear() {
      this.searchKey = "";
      this.applyFilter();
    }
  
    applyFilter() {
      this.listData.filter = this.searchKey.replace(/\s/g, "");
      //10.trim().toLowerCase();
    }
    onCreate() {
      this.service.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(ClientComponent,dialogConfig);
    }
  
    onEdit(row){
      this.service.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(ClientComponent,dialogConfig);
    }
  
    onDelete($key){
      this.dialogService.openConfirmDialog('Are you sure to delete this client ?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.service.deleteClient($key);
          this.notificationService.warn('Client deleted!');
        }
      });
    }
}
