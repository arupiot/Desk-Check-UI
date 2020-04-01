import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.location.href = "http://iot.arup.com:3000/d/000000001/arup-8-fitzroy-st-overview?refresh=5s&orgId=1"
  }

}
