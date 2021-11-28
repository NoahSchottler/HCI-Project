import { Component } from '@angular/core';
import { Word } from './Word';
import NaiveBayesClassifier from "naive-bayes-classifier";
import {LoaddataService} from './loaddata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service: LoaddataService) {}
  title = 'HCI-Project';
  nb = new NaiveBayesClassifier();


  //-----USER REVIEW SECTION VALUES----------//
  //CASE
  userReview = '';

  //This is your value for submitted Reviews
  submittedReview: string = '';

  //A list of seperated words from user submitted review
  userWords: Array<string> = [];

  //submits user review and splits each word into the userWords array
  submitReview(review: string){
    this.submittedReview = review;
    this.userWords = this.submittedReview.split(' ');
    this.classify(this.submittedReview);
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

  async train() {
    // const dumbData = [
    //   {category:"1", text:"good great awesome cool"},
    //   {category:"1", text:"sweet nice like great"},
    //   {category:"1", text:"fun like funny enjoy"},
    //   {category:"0", text:"bad dislike angry"},
    //   {category:"0", text:"unfunny sad pathetic"},
    //   {category:"0", text:"lame sad boring angry"},
    // ];
    //
    // this.nb.train(dumbData);

    let data = this.GetTrainingData();
    await data.then(res => {
      this.nb.train(res);
    });
  }

  classify(input: string) {
    this.train().then(r => {
      console.log('Data Trained!!');
      console.log('Starting Classification...');
      console.log(this.nb.categorize(input));
    });
  }

  async GetTrainingData(): Promise<Object[]> {
    let TrainingData: Object[] = [];
    let rawData = this.service.getData();
    await rawData.then((res) => {
      let finalData: string[] = [];
      let stringData: string[] = res.split('\n');
      stringData.forEach((value, index) => {
        // @ts-ignore
        stringData[index] = value.split('\t');
      });

      // Create the objects for training
      stringData.forEach(val => {
        let obj = {
          category: val[0],
          text: val[1],
        };
        if(obj.text != '' && obj.category != ''){
          TrainingData.push(obj);
        }
      });
    });
    return TrainingData;
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
