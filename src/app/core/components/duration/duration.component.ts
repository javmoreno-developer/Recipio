import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
})
export class DurationComponent implements OnInit {

  showDate = true;
  chipArray: boolean[] = [false,false,false,false,false,false];
  chipArrayValue: number[] = [5,10,20,30,60,120];
  myDate = "2023-02-24T10:15:00+01:00";

  constructor(private modalCtr: ModalController) { }

  ngOnInit() {}



  operation(type, object) {
    var minutesTotal = 0
    var msg = ""
    if(this.showDate) {

      var dateFormat = this.myDate.split('T')[1]; 
      var hours = dateFormat.split(":")[0]
      var minutes = dateFormat.split(":")[1];
      minutesTotal = parseInt(hours) * 60 + parseInt(minutes);
      console.log(minutesTotal);
      msg = hours + ":" + minutes;
    } else {
      // vemos los chips que estan seleccionados
      this.chipArray.forEach((element,index)=> {
        if(element) {
         minutesTotal += this.chipArrayValue[index];
        }
      });
      console.log(minutesTotal)
      msg = minutesTotal + "min"
    }
    this.modalCtr.dismiss({type: type, content: minutesTotal, msg: msg})
  }

  showTemp() {
    this.showDate = true;
    this.chipArray.forEach((element)=> {
      if(element) {
        this.showDate = false;
      }
    });

  }
  
  chipClick(param) {
    this.chipArray[param.position] = param.showDate;
    this.showTemp();
  }
}
