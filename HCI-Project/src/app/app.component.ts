import { Component } from '@angular/core';
import { Word } from './Word';
import NaiveBayesClassifier from "naive-bayes-classifier";
import {TrainingData} from './Word';

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
    this.classify(this.submittedReview);
  }

  uploadDocument(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(file);
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

  classify (input: string) {
    let nb = new NaiveBayesClassifier();
    nb.train(TrainingData);
    console.log(nb.categorize(input));
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
