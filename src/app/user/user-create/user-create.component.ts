import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Company } from 'src/app/common/company';
import { Role } from 'src/app/common/role';
import { User } from 'src/app/common/user';
import { CompanyService } from 'src/app/services/company.service';
import { RoleService } from 'src/app/services/role.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  faList = faList;
  company: Company | undefined;
  roles: Role[] = [];

  userForm = this.formBuilder.group({
    firstname: new FormControl('',[Validators.required,Validators.minLength(2)]),
    lastname:  new FormControl('',[Validators.required,Validators.minLength(2)]),
    username: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    role: new FormControl('', [Validators.required, Validators.minLength(2)]),
    company: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(private companyService: CompanyService,
              private roleService: RoleService,
              private userService: UserServiceService,
              private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.initPage();
  }

  initPage(): void {
    this.companyService.getCompanyById().subscribe(
      data => this.company = data
    );
    this.roleService.getRoles().subscribe(
      data => this.roles = data
    );
  }

  onSubmit():any{
    console.log(this.userForm.value); 
    const user: User = this.userForm.value as User;
    // let role: Role = this.userForm.value.role as Role!;
    // let comp: Company = this.userForm.value.company;
    // new User(
    //   this.userForm.value.username!,
    //   this.userForm.value.password!,
    //   this.userForm.value.firstname!,
    //   this.userForm.value.lastname!,
    //   this.userForm.value.phone!,
    //   role,
    //   comp
    // );
    this.userService.createUser(user).subscribe(
      data => console.log(data)
    );
  }

  
  
  

}
