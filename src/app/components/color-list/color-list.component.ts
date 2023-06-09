import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/colorModel/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit{

  colors : Color[] = []

  constructor(private colorService:ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

}
