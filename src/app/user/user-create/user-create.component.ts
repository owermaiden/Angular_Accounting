import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faList, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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
  user$: User = new User;
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
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.getUserById(); })
    this.initPage();
  }

  getUserById() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(id).subscribe(
      (response: User) => this.user$ = response
    )
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
    this.userService.createUser(user).subscribe(
      data => console.log(data)
    );
    this.router.navigate(['/userlist']);
  }

  
  
  

}
