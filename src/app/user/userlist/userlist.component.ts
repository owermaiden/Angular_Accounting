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
    this.userservice.getUsers().subscribe(
      data => this.users = data
    );
    this.userservice.usersChanged.subscribe(
      data => this.users.push(data)
    )
      
  }


  deleteUser(user: User): void{
    this.users = this.users.filter(h => h !== user);
    this.userservice.deleteUser(user.id!).subscribe();
  }

}
