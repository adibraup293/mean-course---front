import { Subject } from 'rxjs';
import {Injectable} from '@angular/core';
import {TestKit} from './testKit.model';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class TestKitsService{
  private testKits: TestKit[] = [];
  private testKitsUpdated = new Subject<TestKit[]>();

  constructor(private http: HttpClient, private router: Router) {}

  // to fetch a TestKit
  getTestKit(id: string){
    //fetch the object from TestKit array
    return{...this.testKits.find(p => p.id === id)}; //check if test kit id is equal to id parameter
  }

  // to make changes to a testkit and save those changes
  updateTestKit(id: string, testkitname: string, testkitstock:string){
    const testKit: TestKit = {id: id, testkitname: testkitname, testkitstock: testkitstock};
    this.http.put('http://localhost:3000/api/testkits/' + id, testKit)
      .subscribe(response => {
        console.log(response);
        // this.router.navigate(['/']);
      });
    }

  // to retrieve the testkit
  getTestKits() {
    this.http.get<{message: string, testKits: any}>('http://localhost:3000/api/testkits/')
      .pipe(map((testKitData) => {
        return testKitData.testKits.map(testKit => {
          return {
            testkitname: testKit.testkitname,
            testkitstock: testKit.testkitstock,
            id: testKit._id
          };
        });
      }))
      .subscribe(transformedTestKits => {
        this.testKits = transformedTestKits;
        this.testKitsUpdated.next([...this.testKits]);
      })
  }

  getTestKitsUpdateListener(){
    return this.testKitsUpdated.asObservable();
  }

  addTestKit(testkitname: string, testkitstock: string){
    const testkit: TestKit = {id: null, testkitname: testkitname, testkitstock:testkitstock};
    this.http
    .post<{message:string, testKitId: string}> ('http://localhost:3000/api/testkits', testkit)
    .subscribe((responseData) => {
      const id = responseData.testKitId;
      testkit.id = id;
      console.log(responseData.message);
      this.testKits.push(testkit);
      this.testKitsUpdated.next([...this.testKits]);
      //this.router.navigate(['/']);
    });
  }

  deleteTestkit(testKitId: string){
    this.http.delete('http://localhost:3000/api/testkits/' + testKitId)
    .subscribe(() => {
      const updatedTestkits = this.testKits.filter(testKit => testKit.id !== testKitId);
      this.testKits = updatedTestkits;
      this.testKitsUpdated.next([...this.testKits]);
      console.log('Deleted');
    });
  }


}
