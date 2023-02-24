import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chip-time',
  templateUrl: './chip-time.component.html',
  styleUrls: ['./chip-time.component.scss'],
})
export class ChipTimeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  time: string
  color: string
  class: string = "nonSelected"
  selected: boolean = false;
  background: string = "none"
  position: number = 0

  @Input("object") set object(n: any) {
    this.time = n.time;
    this.color = n.color;
    this.position = n.position
  }

  @Output("onChipClick") onChipClick = new EventEmitter();

  chipClick() {
    if(this.selected == false) {
      this.class = "selected";
      this.selected = true;
      this.background = this.color
      this.onChipClick.emit({"showDate": this.selected, "position": this.position})
    } else {
      this.class = "nonSelected";
      this.selected = false;
      this.background = "none";
      this.onChipClick.emit({"showDate": this.selected, "position": this.position})
    }
  }
}
