import { Component, OnInit } from '@angular/core';
import { DeskServiceService } from '../../../core/services/deskService/desk-service.service';
import { Desk } from '../../../core/models/Desk.model';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {

  constructor(
    private deskService: DeskServiceService
    ) { }

  ngOnInit() {
    this.deskService.getAll().subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
