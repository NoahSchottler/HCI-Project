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
  trained = false;
  probability = -1;
  category = '';
  nb = new NaiveBayesClassifier();


  //-----USER REVIEW SECTION VALUES----------//
  //CASE
  userReview = '';

  //This is your value for submitted Reviews
  submittedReview: string = '';

  //A list of seperated words from user submitted review
  userWords: Array<string> = [];

  /**
   * submits user review and splits each word into the userWords array
   * @param review text grabbed from input textbox
   */
  submitReview(review: string){
    this.submittedReview = review;
    this.userWords = this.submittedReview.split(' ');
    if(!this.trained){
      this.train().then(r => {
        this.classify(this.submittedReview);
        this.trained = true;
      });
    }
    else{
      this.classify(this.submittedReview);
    }
  }

  //CASE
  //a custom assignment to the list the table will show. I will split this up later this week.
  words: Word[] = [
    {name: 'apple', favorable: 65.74, unfavorable: 34.26},
    {name: 'noah', favorable: 65.74, unfavorable: 34.26},
    {name: 'test', favorable: 65.74, unfavorable: 34.26}
  ];
  //-------------------------------------------//

  /**
   * Trains data from text file.
   */
  async train() {
    let data = this.GetTrainingData();
    await data.then(res => {
      this.nb.train(res);
    });
  }

  /**
   * Given the input string, returns the result of the classification.
   * @param input the string to classify
   */
  classify(input: string) {
    console.log('Starting Classification...');
    let classification = this.nb.categorize(input);
    this.probability = classification.probability;
    if(classification.category == "1"){
      console.log('Classification: Positive (Fresh) Review');
      this.category = 'Positive';
    }
    if(classification.category == "0"){
      console.log('Classification: Negative (Rotten) Review');
      this.category = 'Negative';
    }
    console.log('Confidence: ' + (100 + this.probability) + "%");
  }

  /**
   * Retrieves training data from service. Service grabs training data from src/assets/data.txt
   * @constructor
   */
  async GetTrainingData(): Promise<Object[]> {
    let TrainingData: Object[] = [];
    let rawData = this.service.getData();

    // Grabbing data from service is asynchronous, we wait for the resolution
    await rawData.then((res) => {

      // Divide input data into an array where each row is a record
      let stringData: string[] = res.split('\n');

      // Foreach record, break into two parts - Classification Label, and Text
      stringData.forEach((value, index) => {
        // @ts-ignore
        stringData[index] = value.split('\t');
      });

      // Create the objects for training - training function only recognizes key value pairs
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
