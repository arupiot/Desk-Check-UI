import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-select-page',
  templateUrl: './page-select-page.component.html',
  styleUrls: ['./page-select-page.component.scss']
})
export class PageSelectPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  handleClick(route: String) {
    console.log("Click!", route);
  }

}
