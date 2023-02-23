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
  error!: string;
  
  constructor(private userservice: UserServiceService) {  }

  ngOnInit(): void {
    this.userservice.fetchUsers();
    this.userservice.getUsers().subscribe(
      data => this.users = data
    );
      
  }

  deleteUser(user: User): void{
    this.userservice.deleteUser(user.id!).subscribe(
      (res: any) => this.userservice.fetchUsers(),
      (err: any) => this.error = err
    );
  }



}
