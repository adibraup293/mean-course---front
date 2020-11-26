import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Test } from './test.model';

import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class TestService{
  private tests : Test[] = [];
  private testUpdated = new Subject<Test[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getTest(id: string){
    return{...this.tests.find(p => p.id === id)};
  }

  updateTest(id: string, patienttype: string, symptoms: string){
    const test: Test = {id:id, patienttype:patienttype, symptoms:symptoms};
    this.http.put('http://localhost:3000/api/tests/' + id, test)
      .subscribe(response => {
        console.log(response);
      });
  }

  getTests(){
    this.http.get<{message: string, testKits: any}>('http://localhost:3000/api/testkits/')
      .pipe(map((testData) => {

      }))
  }
}
