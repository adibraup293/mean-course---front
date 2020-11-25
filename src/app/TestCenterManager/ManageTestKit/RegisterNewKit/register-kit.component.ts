import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {TestKit} from '../testKit.model';
import {TestKitsService} from '../testKit.service';

@Component({
  selector: 'kit-register',
  templateUrl: './register-kit.component.html',
  styleUrls: ['./register-kit.component.css']
})

export class RegisterKitComponent implements OnInit {

  testKit: TestKit;
  private mode = 'create';
  private testKitId: string;

  constructor(public testkitsService: TestKitsService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('testKitId')) {
        this.mode = 'edit';
        this.testKitId = paramMap.get('testKitId');
        this.testKit = this.testkitsService.getTestKit(this.testKitId);

      } else {
        this.mode = 'create';
        this.testKitId = null;
      }
    });
  }

  onSaveTestKit(form: NgForm){
    if (form.invalid){
      return;
    }
    if (this.mode === 'create'){
      this.testkitsService.addTestKit(form.value.testkitname, form.value.testkitstock);
    } else {
      this.testkitsService.updateTestKit(this.testKitId, form.value.testkitname, form.value.testkitstock);
    }

    form.resetForm();
  }




}
