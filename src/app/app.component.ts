import { Component } from '@angular/core';
import { faHome, faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faHome = faHome;
  faLogout = faPowerOff;
  title = 'accounting';


}
