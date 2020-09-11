import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { User, UserService } from './user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public _userService: UserService, private dialog: MatDialog) { }

  public showUsers: boolean = false;
  public userList: User[];

  ngOnInit(): void {
    this.getUsers();
  }

  public addNewUser(){
    let dialogRef = this.dialog.open(AddNewUserComponent, {width: '250px',})
    dialogRef.afterClosed()
      .subscribe(() =>
      this.getUsers()
      );
  }

  public changeUser(user: User){
    this._userService.LoggedUser = user;
    this.showUsers = false;
  }

  public get name(){
    if(!this._userService.LoggedUser)
      return "SEM USUARIO CADASTRADO"
    return this._userService.LoggedUser.name;
  }

  private getUsers(){
    this._userService.getUserList(10).subscribe((resp) =>{
      this.userList = resp;

      if(!this._userService.LoggedUser && resp.length > 0)
        this._userService.LoggedUser = resp[0];
    })
  }

}
