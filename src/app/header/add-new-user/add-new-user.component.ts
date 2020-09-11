import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private _userService: UserService,
    private dialogRef: MatDialogRef<AddNewUserComponent>) { }

  public userForm: FormGroup;

  private _createForm(): void {
    this.userForm = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      date: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this._createForm();
  }

  public onAddClick() {
    this._userService.postUser(this.userForm.value).subscribe(() => {
      this.dialogRef.close()
    });
  }

}
