import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, ResponsiveContainer, PolarAngleAxis
} from 'recharts';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import Card from 'react-bootstrap/Card'

class Stats extends React.Component{
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
            test: [],
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
    
    getJson = async () => {
      const api = axios.create({
        baseURL: 'http://127.0.0.1:5000/stats/'
      })
      let res = await api.get('/').then(res =>{
        
        this.setState({
          isLoaded: true,
          posted_items: res.data.stats
        })
      })
    }
   
    render (){
    const { error, isLoaded, pyResp, page, legend, age, posted_items, is_posted} = this.state;
    
    if (isLoaded === false){
      this.getJson();
    }
    
    var a = posted_items.admissionDiagnosis_hospitalization
    var b = posted_items.admission_type_FemaleAgeGroup
    var c = posted_items.admission_type_MaleAgeGroup
    var d = posted_items.hospitalization_FemaleAgeGroup
    var e = posted_items.hospitalization_Vs_age
    var f = posted_items.hospitalization_admissType
    var g = posted_items.hospitalization_maleAgeGroup
    
    return(
        <div className="App">
          <h1>Here are some facts about the data</h1>
          
          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Number of patients</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">per admission type</Card.Subtitle>
                    <Card.Text>
                      <span style={{color:"#FA8072"}}>Female &#10084; </span><span style={{color:"#82ca9d"}}> Male &#9873;</span>  
                    </Card.Text>
                    <ResponsiveContainer  height={400}>
                    <PieChart>
                      <Pie data={b} dataKey="count" nameKey="category" cx={200} cy={200} outerRadius={60} fill="#FA8072" />
                      <Pie data={c} dataKey="count" nameKey="category" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                      <Tooltip/>
                    </PieChart>
                  </ResponsiveContainer>
                  </Card.Body>
                </Card>               
              </Col>
              <Col>
              <Card>
                  <Card.Body>
                    <Card.Title>Number of patients</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">per age group</Card.Subtitle>
                    <Card.Text>
                      <span style={{color:"#85C1E9"}}>Female &#10084; </span><span style={{color:"#EDBB99"}}> Male &#9873;</span> 
                    </Card.Text>
                    <ResponsiveContainer height={400}>
                      <PieChart>
                        <Pie data={d} dataKey="count" nameKey="category" cx={200} cy={200} outerRadius={60} fill="#85C1E9" />
                        <Pie data={g} dataKey="count" nameKey="category" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#EDBB99" label />
                        <Tooltip/>
                      </PieChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
                
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Hospitalization days</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">per admission type</Card.Subtitle>
                    <Card.Text>
                      Male Female
                    </Card.Text>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart width={1000} height={300} data={f} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                          <CartesianGrid strokeDasharray="3 3"/>
                          <XAxis dataKey="category"   />
                          <YAxis  />
                          <Tooltip/>
                          <Bar dataKey="count" fill="#7D3C98" />
                        </BarChart>
                      </ResponsiveContainer>

                  </Card.Body>
                </Card> 
              </Col>
            </Row>                     
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Days spent in the hospital</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">per age group</Card.Subtitle>
                    <ResponsiveContainer width="100%" height={300}>                
                      <BarChart width={1000} height={300} data={e} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="category"  />
                        <YAxis  />
                        <Tooltip/>
                        <Bar dataKey="count" fill="#E74C3C" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>                    
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                    <Card.Body>
                      <Card.Title>Days spent in the hospital</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">per type of type admission diagnosis</Card.Subtitle>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart width={1000} height={300} data={a} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                          <CartesianGrid strokeDasharray="3 3"/>
                          <XAxis dataKey="category" tick={false}  />
                          <YAxis  />
                          <Tooltip/>
                          <Bar dataKey="count" fill="#2980B9" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card.Body>
                  </Card>                
              </Col>
            </Row>
          </Container>
                   
        </div>
        );
            }
}

export default Stats;