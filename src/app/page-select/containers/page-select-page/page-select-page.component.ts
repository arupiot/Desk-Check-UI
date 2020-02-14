import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-select-page',
  templateUrl: './page-select-page.component.html',
  styleUrls: ['./page-select-page.component.scss']
})
export class PageSelectPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  handleClick(route: String) {
    this.router.navigate([route]);
  }

}
