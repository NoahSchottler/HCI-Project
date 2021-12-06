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
  nb = new NaiveBayesClassifier();
  TrainingData: Object[] = [];
  title = 'HCI-Project';
  trained = false;
  probability = -1;
  category = '';
  userReview = '';
  IsWait = false;
  //the favorable value for the searched word
  searchedConfidence = 0.00;
  searchedCategory = "";
  //number of reviews the searched word has appeared in
  appearedCount = 100;
  //number of favorable reviews the searched word has appeared in
  appearedFavorableCount = 50;
  //number of unfavorable reviews the searched word has appeared in
  appearedUnfavorableCount = 50;
  //keeps a p element from not showing if the user hasn't searched a word doesn't exist
  //CASE
  notSubmitted = true;
  //CASE
  searchedFlag = false;
  //CASE
  searchingWord = '';
  //the word the user searched
  searchedWord = '';
  //CASE
  //a custom assignment to the list the table will show. I will split this up later this week.
  words: Word[] = [];
  //This is your value for submitted Reviews
  submittedReview: string = '';
  //A list of seperated words from user submitted review
  userWords: Array<string> = [];

  //CASE
  roundedConfidence = (Math.round((100+this.probability)*100)/100);
  // Math.round( (100 + result.probability + Number.EPSILON)*100)/100;

  /**
   * Instantiates service
   * @param service
   */
  constructor(private service: LoaddataService) {}

  /**
   * submits user review and splits each word into the userWords array
   * @param review text grabbed from input textbox
   */
  submitReview(review: string){
    this.IsWait = true;
    this.submittedReview = review;
    if(!this.trained){
      this.train().then(r => {
        this.classify(this.submittedReview);
        this.trained = true;
      });
    }
    else{
      this.classify(this.submittedReview);
    }
    this.notSubmitted = false;
  }

  /**
   * Trains data from text file.
   */
  async train() {
    let data = this.GetTrainingData();
    await data.then(res => {
      this.nb.train(res);
      console.log('Training Completed');
    });
  }

  /**
   * Given the input string, returns the result of the classification.
   * @param input the string to classify
   */
  classify(input: string) {
    console.log('Starting Classification');
    this.IsWait = false;
    let classification = this.nb.categorize(input);
    this.probability = classification.probability;
    this.roundedConfidence = (Math.round((100+this.probability)*100)/100);
    if(classification.category == "1"){
      console.log('Classification: Positive (Fresh) Review');
      this.category = 'Positive';
    }
    if(classification.category == "0"){
      console.log('Classification: Negative (Rotten) Review');
      this.category = 'Negative';
    }
    console.log('Confidence: ' + (100 + this.probability) + "%");
    this.userWords = this.submittedReview.split(' ');
    this.words = [];
    this.userWords.forEach(value => {
      let result = this.nb.categorize(value)
      this.words.push({
        name: value,
        category: result.category,
        confidence: 100 + result.probability,
      });
      }
    );
  }

  /**
   * Retrieves training data from service. Service grabs training data from src/assets/data.txt
   * @constructor
   */
  async GetTrainingData(): Promise<Object[]> {
    let TrainingDataLocal: Object[] = [];
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
          TrainingDataLocal.push(obj);
        }
      });
    });
    this.TrainingData = TrainingDataLocal;
    return TrainingDataLocal;
  }

  searchWord(input: string){
    this.searchedWord = input;
    this.searchedFlag = true;
    let result = this.nb.categorize(input)
    // this.searchedConfidence = 100 + result.probability;
    this.searchedConfidence = Math.round( (100 + result.probability + Number.EPSILON)*100)/100;
    if(result.category == "1"){
      this.searchedCategory = 'Positive';
    }
    if(result.category == "0"){
      this.searchedCategory = 'Negative';
    }
    let localTrainingData: { category: string; text: string };
    let count = 0;
    let negCount = 0;
    let posCount = 0;
    this.TrainingData.forEach(value => {
      let arrayText: any;
      // @ts-ignore
      arrayText = value.text.split(' ');
      // @ts-ignore
      if(value.category == "1"){
        arrayText.forEach((value: string) => {
          if (value == input){
            count++;
            posCount++;
          }
        })
      }
      // @ts-ignore
      if(value.category == "0"){
        arrayText.forEach((value: string) => {
          if (value == input){
            count++;
            negCount++;
          }
        })
      }

    });
    this.appearedCount = count;
    this.appearedFavorableCount = posCount;
    this.appearedUnfavorableCount = negCount;
  }
}
