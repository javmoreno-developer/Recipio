import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  data: string | undefined;

  @Input("mode") set mode(n: string) {
    this.data = n;
  }
  constructor() { }

  ngOnInit() {}

}
