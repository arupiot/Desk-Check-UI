import { Component, OnInit } from '@angular/core';

import { NotifService } from '../../services/notification/notif.service';
import { UserService } from '../../services/userService/user-service.service';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss']
})
export class ReportProblemComponent implements OnInit {

  constructor(
    private notifService: NotifService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  handleClick() {
    const content = prompt("Notification message");

    const email = this.userService.getUser() ? this.userService.getUser().email : "deskcheck@arup.com";

    if (content) {
      this.notifService.sendNotif(email,content).subscribe(res=>{
        console.log(res);
      });
    }
  }

}
