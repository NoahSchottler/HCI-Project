import { Component } from '@angular/core';
import { Word } from './Word';
import NaiveBayesClassifier from "naive-bayes-classifier";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HCI-Project';


  //-----USER REVIEW SECTION VALUES----------//
  //CASE
  userReview = '';

  //This is your value for submitted Reviews
  submittedReview: string = '';

  //A list of seperated words from user submitted review
  userWords: Array<string> = [];

  //submits user review and splits each word into the userWords array
  //CASE
  submitReview(review: string){
    this.submittedReview = review;
    this.userWords = this.submittedReview.split(' ');
  }
  //-----------------------------------------//




  //---------RESULTS SECTION VALUES-------------//
  //assign the overal rating of the user submitted review
  overallRating = 12;
  //this should either be positive or negative, depending on the review.
  thumbsValue = 'Negative';

  //CASE
  //a custom assignment to the list the table will show. I will split this up later this week.
  words: Word[] = [
    {name: 'apple', favorable: 65.74, unfavorable: 34.26},
    {name: 'noah', favorable: 65.74, unfavorable: 34.26},
    {name: 'test', favorable: 65.74, unfavorable: 34.26}
  ];
  //-------------------------------------------//

  classify () {
    let nb = new NaiveBayesClassifier();
    // test dataset
    let trainArray = [{
      category: "1",
      text: "a b c d e"
    },{
      category: "1",
      text: "b, c,d e"
    },{
      category: "1",
      text: "a.e f c c e a"
    },{
      category: "2",
      text: "m z x t a y x"
    },{
      category: "2",
      text: "x t m"
    },{
      category: "2",
      text: "b t x"
    }];
    nb.train(trainArray);

    console.log(nb.categorize(' a e f c'));
  }


  //-----------SEARCH WORD SECTION-----------//

  //keeps a p element from not showing if the user hasn't searched a word doesn't exist
  //CASE
  searchedFlag = false;
  //CASE
  searchingWord = '';


  //the word the user searched
  searchedWord = '';

  //CASE
  searchWord(searched: string){
    this.searchedWord = searched;
    this.searchedFlag = true;
  }

  //the favorable value for the searched word
  searchedFavorable = 0.00;
  //the unFavorable value for the searched word
  searchedUnfavorable = 0.00;

  //number of reviews the searched word has appeared in
  appearedCount = 100;
  //number of favorable reviews the searched word has appeared in
  appearedFavorableCount = 50;
  //number of unfavorable reviews the searched word has appeared in
  appearedUnfavorableCount = 50;

}
