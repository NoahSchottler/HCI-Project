<h1>Movie Review Sentiment Classifier</h1>
<h2>Final Project - Human Computer Interaction</h2>
<p>Noah Schottler, Noah Case</p>

<h1>How to Execute this Project</h1>
<p>This app was built with Angular. To launch the project, download the source code, open a terminal within the "HCI-Project" directory, and execute the command "ng serve" from the terminal.</p>

<h1>Functions</h1>
<ul>
<li>Submit Input for Classification</li>
<p>The main functionality of our project is the review text classifier, which utilizes the Naive Bayes algorithm to classify text into two categories: positive or negative.
When visiting the application, the user will see the submission text box where they will input their text, and then hit the submit button. This will call the classification function
which will determine whether their input was positive or negative. The results screen will show this result, as well as the internal confidence of the classifier. The user can also view
a breakdown of the individual words composing their input and their categories.</p>
<li>Search for Specific Words</li>
<p>In addition to the classifier, it may also be interesting for a user to view more specific details on vocabulary contained within the dataset. This is why we've implemented 
the "Search for Specific Words" section, which allows users to view a breakdown on how many reviews contained a specific word from each category.</p>
</ul>

<h1>Other Functions</h1>
<ul>
<li>Naive Bayes Classifier</li>
<p>The classification technique that we utilized for this project is the Naive Bayes algorithm, which provides support for classifying input records with multiple properties into 
distinct categories. The algorithm starts by generating a vocabulary from every instance of a word contained within the training data. Once this is completed, it's now possible
to convert the records contained in the training data into numerical representations of whether a given vocabulary is present or not within the record. Combined with the class label,
the algorithm is now capable of building probabilities for every word present in the vocabulary appearing in either class label. Once training of the classifier is complete, classification is 
very efficient.</p>
</ul>
<p></p>

<h1>Citations</h1>
<ul>
<li><a href = "https://github.com/nicolas-gervais/rotten-tomatoes-dataset">Dataset: Rotten Tomatoes Reviews/Labels (Collected By Nicolas Gervais)</a></li>
<li><a href="https://github.com/sleagon/bayes">Naive Bayes Classifier by sleagon</a></li>
<li><a href="https://medium.com/analytics-vidhya/naive-bayes-classifier-for-text-classification-556fabaf252b">Aiyappan, J. (2019, September 8). Naive Bayes classifier for text classification. Medium.</a></a></li>
<li><a href="https://sebastianraschka.com/Articles/2014_naive_bayes_1.html">Naive Bayes and text classification. Dr. Sebastian Raschka. (2014, October 4)</a></li>
</ul>



<h1>Link to Demo Video</h1>
<li><a href="https://www.youtube.com/watch?v=19Yttc4naGw">Human Computer Interactions Project Demo</a></li>
<li><a href="https://github.com/NoahSchottler/HCI-Project">Link to GitHub Repository</a></li>
