import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor() { }

  ngOnInit() {}

  next(slider: IonSlides) {
    slider.slideNext()
  }

  prev(slider: IonSlides) {
    slider.slidePrev()
  }
 
}
