import { Component } from '@angular/core';
import { Word } from './Word';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HCI-Project';

  userReview = '';

  //This is your value for submitted Reviews
  submittedReview: string = '';

  //a custom assignment to the list the table will show. I will split this up later this week.
  words: Word[] = [
    {name: 'apple', favorable: 65.74, unfavorable: 34.26},
    {name: 'noah', favorable: 65.74, unfavorable: 34.26},
    {name: 'test', favorable: 65.74, unfavorable: 34.26}
  ]

  submitReview(review: string){
    this.submittedReview = review;
  }
}
