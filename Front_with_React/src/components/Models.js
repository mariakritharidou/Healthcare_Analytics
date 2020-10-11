import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Models extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
            error: null,
            isLoaded: false,
            pyResp: [],
            page: 0,
            legend: 'stats',
            posted_items: [],
            is_posted: false,

            age: 50,
            gender: '',
            admission_origin: '',
            admission_type: '',
            admission_diagnosis: '',
            admission_procedure: '',
            insurance: '',
            religion: '',
            ethnicity: '',
            marital_status: '',
        };
    }
    postJson = async () => {
        const api = axios.create({
            baseURL: 'http://127.0.0.1:5000/models/'
        })
        var { age, gender, admission_origin, admission_type, admission_diagnosis, admission_procedure, insurance, religion, ethnicity, marital_status} = this.state;
        
        var age  = document.getElementById('age').value;
    
        var e = document.getElementById('gender');
        gender = e.options[e.selectedIndex].value

        e = document.getElementById('admission_origin');
        admission_origin = e.options[e.selectedIndex].value
        
        e = document.getElementById('admission_type');
        admission_type = e.options[e.selectedIndex].value
    
        e = document.getElementById('admission_origin');
        admission_origin = e.options[e.selectedIndex].value
    
        e = document.getElementById('admission_diagnosis');
        admission_diagnosis = e.options[e.selectedIndex].value
    
        var admission_procedure = document.getElementById('admission_procedure').value;
    
        e = document.getElementById('insurance');
        insurance = e.options[e.selectedIndex].value
    
        e = document.getElementById('religion');
        religion = e.options[e.selectedIndex].value
        
        e = document.getElementById('ethnicity');
        ethnicity = e.options[e.selectedIndex].value
        
        e = document.getElementById('marital_status');
        marital_status = e.options[e.selectedIndex].value
        
        let res = await api.post('/',{
            "age": age,
            "gender": gender,
            "admission_origin": admission_origin,
            "admission_type": admission_type,
            "admission_diagnosis" : admission_diagnosis,
            "admission_procedure" : admission_procedure,   
            "insurance": insurance,
            "religion" : religion,
            "ethnicity": ethnicity,
            "marital_status": marital_status
        })
        this.state.posted_items = res.data.prediction
        this.state.is_posted = true
        console.log(this.state.posted_items)
        alert(this.state.posted_items.map(prediction =>(prediction.hospitalization)));
      }

    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }

    render (){
    const { error, isLoaded, pyResp, page, legend, age, posted_items, is_posted} = this.state;
    console.log(posted_items)
    return(
    <div className="App">
          
          <h3>How many days is the patient going to stay?</h3>
          <h3>Fill the data below to find out!</h3>
          <Form.Group>

            <p>Set age: &nbsp;
            <Form.Control type="range" id='age' type='range' name='age' min="0" max="120" onChange={this.myChangeHandler}/>{age}
            </p>
            <p>Select gender: &nbsp;
            <Form.Control as="select" id='gender' name='gender' onChange={this.myChangeHandler}>
              <option value="" selected disabled hidden></option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Form.Control>
            </p>
            <p>Select admission_origin: &nbsp;
            <Form.Control as="select" id='admission_origin' name='admission_origin' onChange={this.myChangeHandler}>
              <option value="" selected disabled hidden></option>
              <option value="ADMITTED FROM EMERGENCY">ADMITTED FROM EMERGENCY</option>
              <option value="PHYSICAL REFERRAL">PHYSICAL REFERRAL</option>
              <option value="CLINIC REFERRAL">CLINIC REFERRAL</option>
              <option value="TRANSFER FROM HOSPITAL">TRANSFER FROM HOSPITAL</option>
              <option value="NOT AVAILABLE">NOT AVAILABLE</option>
            </Form.Control>
            </p>
            <p>Select admission_type: &nbsp;
            <Form.Control as="select" id='admission_type' name='admission_type' onChange={this.myChangeHandler}>
              <option value="" selected disabled hidden></option>
              <option value="EMERGENCY">EMERGENCY</option>
              <option value="NEWBORN">NEWBORN</option>
              <option value="ELECTIVE">ELECTIVE</option>
              <option value="URGENT">URGENT</option>
            </Form.Control>
            </p>
            <p>Select admission_diagnosis: &nbsp;
            <Form.Control as="select" id='admission_diagnosis' name='admission_diagnosis' onChange={this.myChangeHandler}>
              <option value="" selected disabled hidden></option>
              <option value="NEWBORN">NEWBORN</option>
              <option value="CORONARY ARTERY DISEASE">CORONARY ARTERY DISEASE</option>
              <option value="GASTROINTESTINAL BLEED">GASTROINTESTINAL BLEED</option>
              <option value="PNEUMONIA">PNEUMONIA</option>
              <option value="SEPSIS">SEPSIS</option>
              <option value="CHEST PAIN">CHEST PAIN</option>
              <option value="CONGESTIVE HEART FAILURE">CONGESTIVE HEART FAILURE</option>
              <option value="AORTIC STENOSIS">AORTIC STENOSIS</option>
              <option value="ALTERED MENTAL STATUS">ALTERED MENTAL STATUS</option>
              <option value="INTRACRANIAL HEMORRHAGE">INTRACRANIAL HEMORRHAGE</option>
              <option value="STROKE">STROKE</option>
              <option value="FEVER">FEVER</option>
              <option value="OTHER">OTHER </option>
            </Form.Control>
            </p>
            <p>Type admission_procedure: &nbsp;
            <Form.Control type="text" id='admission_procedure' onChange={this.myChangeHandler} placeholder="Type admission_procedure" />
            </p>
            <p>Select insurance: &nbsp;
            <Form.Control as="select" id='insurance' name='insurance' onChange={this.myChangeHandler}>
              <option value="" selected disabled hidden></option>
              <option value="Medicare">MEDICARE</option>
              <option value="Private">PRIVATE</option>
              <option value="Medicaid">MEDICAID</option>
              <option value="Government">GOVERNMENT</option>
              <option value="Self Pay">SELF PAY</option>
            </Form.Control>
            </p>
            <p>Select religion: &nbsp;
            <Form.Control as="select" id='religion' name='religion' onChange={this.myChangeHandler}>
              <option value="" selected disabled hidden></option>
              <option value="CATHOLIC">CATHOLIC</option>
              <option value="ORTHODOX">ORTHODOX</option>
              <option value="JEWISH">JEWISH</option>
              <option value="BUDDHIST">BUDDHIST</option>
              <option value="OTHER">OTHER</option>
            </Form.Control>
            </p>
            <p>Select ethnicity: &nbsp;
            <Form.Control as="select" id='ethnicity' name='ethnicity' onChange={this.myChangeHandler}>
              <option value="" selected disabled hidden></option>
              <option value="WHITE">WHITE</option>
              <option value="BLACK">BLACK</option>
              <option value="ASIAN">ASIAN</option>
              <option value="UKNOWN">UKNOWN</option>
            </Form.Control>
            </p>
            <p>Select marital_status: &nbsp;
            <Form.Control as="select" id='marital_status' name='marital_status' onChange={this.myChangeHandler}>
              <option value="" selected disabled hidden></option>
              <option value="MARRIED">MARRIED</option>
              <option value="SINGLE">SINGLE</option>
              <option value="DIVORCED">DIVORCED</option>
              <option value="UNKNOWN">UNKNOWN</option>
            </Form.Control> 
            </p>
            
          </Form.Group>

          <Button variant="primary" size="lg" block onClick={this.postJson}>
          SUBMIT
          </Button>

        </div>
        );
            }
}

export default Models;