import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  isFM: Observable<boolean>;

  ngOnInit(): void {
    this.isFM = this.userService.isFM;
  }

}
