import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Stats from './components/Stats';
import Models from './components/Models';
import Navbar from './components/Navbar';
import About from './components/About';
import OurTeam from './components/OurTeam';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

export default class App extends Component {
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

  fetchData() {
    console.log("fetching python localhost");
    fetch('http://127.0.0.1:5000/stats/')
      .then(r => r.json())
      .then(res => {
        console.log(res)
        this.setState({
          isLoaded: true,
          posted_items: res.stats
        })
      })
      .catch(err => console.log(err))
  }
  
  render() {
    const { error, isLoaded, pyResp, page, legend, age, posted_items, is_posted} = this.state;
   
      return(
        
        <Router>
          <Switch>
            <Container>
            
              <Row>
                <Col>
                <Navbar />
                </Col>
              </Row>

              <Row>
                <Col>
                <Route path="/Stats" component={Stats}>
                    <Stats />
                  </Route>

                  <Route path="/Models" component={Models}>
                    <Models new Models/>              
                  </Route>

                  <Route path="/About" component={About}>
                    <About />              
                  </Route>

                  <Route path="/OurTeam" component={OurTeam}>
                    <OurTeam/>              
                  </Route>
                </Col>
              </Row>

            </Container>
          </Switch>
        </Router>
      
      )
  }
}