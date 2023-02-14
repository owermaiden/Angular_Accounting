import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Company } from 'src/app/common/company';
import { Role } from 'src/app/common/role';
import { User } from 'src/app/common/user';
import { CompanyService } from 'src/app/services/company.service';
import { RoleService } from 'src/app/services/role.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  faList = faList;
  user$!: User;
  company: Company | undefined;
  roles: Role[] = [];
  userForm!: FormGroup; 

  constructor(private companyService: CompanyService,
    private roleService: RoleService,
    private userService: UserServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: new FormControl('',[Validators.required,Validators.minLength(2)]),
      lastname:  new FormControl('',[Validators.required,Validators.minLength(2)]),
      username: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      role: new FormControl('', [Validators.required]),
      company: new FormControl(this.company, [Validators.required])
    });

    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(() => { this.getUserById(id); });
    this.initPage();
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(
      (response: User) => this.userForm.patchValue(response)
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
    const user: User = this.userForm.value as User;
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userService.updateUser(user, id).subscribe();
    this.router.navigate(['/userlist']);
  }
}
