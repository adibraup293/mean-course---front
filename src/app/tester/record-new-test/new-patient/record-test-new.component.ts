import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { TestKitsService } from 'src/app/TestCenterManager/ManageTestKit/testKit.service';
import { TestCentre } from 'src/app/TestCenterManager/testcentre.model';
import { Test } from '../test.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-record-test-new',
  templateUrl: './record-test-new.component.html',
  styleUrls: ['./record-test-new.component.css']
})

export class RecordTestNewComponent implements OnInit{

  test: Test;
  private mode = 'create';
  private testId: string;

  constructor(public testService: TestKitsService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('testId')) {
        this.mode = 'edit';
        this.testId = paramMap.get('testId');
      } else {
        this.mode = 'create';
        this.testId = null;
      }
    });
  }

  onSaveTest(form: NgForm){
    if (form.invalid){
      return;
    }
    form.resetForm();
  }

}
