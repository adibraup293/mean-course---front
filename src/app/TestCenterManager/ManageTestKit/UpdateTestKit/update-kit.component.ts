import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {TestKit} from '../testKit.model'
import {TestKitsService} from '../testKit.service';

@Component({
  selector: 'app-update-test-kit',
  templateUrl: './update-kit.component.html',
  styleUrls: ['./update-kit.component.css']
})

export class UpdateTestKitComponent implements OnInit, OnDestroy{
  testkits: TestKit[] = [];
  private testKitsSub: Subscription;
  constructor(public testKitsService: TestKitsService){}

  ngOnInit(){
    this.testKitsService.getTestKits();
    this.testKitsSub = this.testKitsService.getTestKitsUpdateListener()
    .subscribe((testKits: TestKit[]) => {
      this.testkits = testKits;
    });

  }

  // ngOnInit(){
  //   this.postsService.getPosts();
  //   this.postsSub = this.postsService.getPostsUpdateListener()
  //   .subscribe((posts: Post[]) => {
  //     this.posts = posts;
  //   });

  // }

  onDelete(testKitId: string){
    this.testKitsService.deleteTestkit(testKitId);
  }

  ngOnDestroy(){
    this.testKitsSub.unsubscribe();
  }
}
