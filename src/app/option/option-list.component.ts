import {Component} from '@angular/core';

@Component({
  selector:'app-list-option',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})

export class OptionListComponent{

  options =[
  {task: 'Print assignment',
    priority: 'high'},
  {task: 'Discuss assignment',
    priority: 'medium'},
  {task: 'Read assignment',
    priority: 'low'}]

  //  setColor(priority){
  //    switch(priority){
  //      case 'high':
  //        return 'red';
  //      case 'medium':
  //        return 'blue';
  //      case 'low':
  //        return 'green';
  //    }
  //  }
}
