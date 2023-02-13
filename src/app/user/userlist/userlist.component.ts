import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { faCirclePlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  faPlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faPen = faPen;
  users: User[] = [];
  

  constructor(private userservice: UserServiceService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): any {
    return this.userservice.getUsers().subscribe(
      response => this.users = response
      );
  }

  deleteUser(id: number){
    this.userservice.deleteUser(id).subscribe(
      (response: any) => console.log(response)
    );
  }

}
