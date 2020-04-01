import { Component, OnInit } from '@angular/core';
import {NotifService} from '../../services/notification/notif.service';
@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss']
})
export class ReportProblemComponent implements OnInit {

  constructor(private notifService : NotifService) {
    
   }

  ngOnInit(): void {
  }
  handleClick() {
    this.notifService.sendNotif().subscribe(res=>{
      console.log(res)
    })
  }

}
