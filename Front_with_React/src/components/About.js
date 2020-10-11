import React, { Component } from 'react';

const About = () => {
    
    return(
        <div >
          <h1>About</h1>
          <br></br>
          <h2>The data</h2>
          <p>The given dataset is a processed version of the <a href='https://mimic.physionet.org/'>Medical Information Mart for 
          Intensive Care (MIMIC-III) dataset</a> that contains information relating to patients admitted to critical care units at a large tertiary care hospital.</p>
          <p>The original MIMIC dataset consists of 28 tables with millions of entries. One
          very popular analysis performed on this dataset is to try to correlate the
          patients’ interactions with the with the hospital with the duration of their
          hospitalization.</p>          
          <p> The dataset that we use in this application contains nearly 50.000 hospital admissions, including
          the duration of their hospitalization (which we try to predict).</p>
          <h2>Stats</h2>
          <p>Stats tab provide meaningful aggregations based on the dataset.</p>
          <h2>Models</h2>
          <p>The goal of this task is to predict the duration that a patient is hospitalized.</p>
          <p>Models tab accept the data for an
          individual patient, in the format of the original file and return the predicted duration of
          hospitalization for that patient. </p>
          <h2>Application architecture</h2>
          <ul>
            <li>A React client posts and gets JSON files to a Flask API</li>
            <li>A Flask API is responsible for:</li>
            <ul>
              <li>Fetching the preprocessed data table.</li>
              <li>Sending stats information in JSON format to be rendered by the React Client.</li>
              <li>Receiving requests, processing the data in the correct form, predicting the hospitalization days and sending it back in JSON format to the React client.</li>
            </ul>
          </ul>
        </div>
        );

}

export default About;