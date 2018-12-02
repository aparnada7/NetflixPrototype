import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import "../App.css"
import {Button} from 'react-bootstrap';
import  logo from '../image/fl-logo.png';
import * as API from '../api/index';
import Dashboard from './dashboard';
import Signup from './signup';
// import NavBar from '../components/navbar';
import AdminNavBar from '../components/adminNavBar';
import AddMovie from '../components/addMovie';
import UpdateMovie from '../components/updateMovie';
import DeleteMovie from '../components/deleteMovie';
import AdminFinancials from '../components/adminFinancials';
import UserDetails from '../components/userDetails';
// import Signup from '../components/signup';

import queryString from 'query-string';
import cookie from "react-cookies";
// let imgStyle = {height: '70px', padding: '10px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};
var Carousel = require('react-bootstrap').Carousel;
let imgStyle = {width: '100%', height: '400px'};
let footerText = {color: '#5DADE2'}
var img1 = require('../image/netflixBG.jpg');


class UserActivity extends Component{
    constructor(props){
        super(props);
        // console.log({props.param.projectName});
         var pid = queryString.parse(this.props.location.search);
         var temp = pid && pid.projectid;

        this.state =  {
            userdata: {
                username: '',
                password: '',
                email: '',
                userId: cookie.load('userId'),
                projectId: temp,
                projectName:'',
                projectDescription:'',
                projectBudget:'',
                projectSkills:'',
                bidamount:'',
                duration:''
            },
            isLoggedIn: false,
            message: '',
            showAddMovieComponent : false,
            showUpdateMovieComponent : false,
            showDeleteMovieComponent : false
        };
          this._onAddClick = this._onAddClick.bind(this);
          this._onUpdateClick = this._onUpdateClick.bind(this);
          this._onDeleteClick = this._onDeleteClick.bind(this);
    }
    _onAddClick() {
        this.setState({
          showAddMovieComponent: true,
          showUpdateMovieComponent : false,
          showDeleteMovieComponent : false
        });
      }
      _onUpdateClick() {
          this.setState({
            showAddMovieComponent: false,
            showUpdateMovieComponent: true,
            showDeleteMovieComponent : false
          });
        }
      _onDeleteClick() {
            this.setState({
              showAddMovieComponent: false,
              showUpdateMovieComponent : false,
              showDeleteMovieComponent: true,
            });
          }
    componentWillMount(){
        var temPid = this.state.userdata.projectId;
        console.log("Before fetch " +this.state.userdata.projectId);
        API.fetchProjectDetails(this.state.userdata)
            .then((res) => {
                console.log("status " +res.details);
                if (res.status === '201') {
                    console.log("In success" +res.details[0].budgetRange);
                    this.setState({
                        isLoggedIn: true,
                        userdata: {
                            projectId: temPid,
                            projectName:res.details[0].projectName,
                            projectDescription:res.details[0].projectDescription,
                            projectBudget:res.details[0].budgetRange,
                            projectSkills:res.details[0].skills,
                        }
                    });
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "No projects found..!!",
                    });
                    this.props.history.push('/projectdetails');
                }
            });
    }
    handleSubmit = () => {
        // API.postBid(this.state.userdata)
        //     .then((res) => {
        //         console.log(res.status);
        //         if (res.status === '201') {
        //             this.setState({
        //                 isLoggedIn: true,
        //                 message: "Bid Posted Successfully..!!"
        //             });
        //             this.props.history.push('/projectdetails');
        //         } else if (res.status === '401') {
        //             this.setState({
        //                 message: "post Failed. Try again..!!",
        //             });
        //         }
        //     });

    };


    render(){
        return(

            <div style={divStyle3}>
                <AdminNavBar/>
                <div className=".container-fluid">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                <Carousel>
                    <Carousel.Item>
                        <img style={imgStyle} alt="freelance.com" src={img1} />
                        <Carousel.Caption>
                            <Button bsStyle="danger" bsSize="large" onClick={this._onAddClick}> User Activity Monitoring</Button> &nbsp;&nbsp;&nbsp;

                            <h3>MovieCentral </h3>
                            <p>Watch at your convinience.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    {/*<Carousel.Item>*/}
                        {/*<img style={imgStyle} alt="freelance.com" src={img2} />*/}
                        {/*<Carousel.Caption>*/}
                            {/*<h3>Netflix</h3>*/}
                            {/*<p>atch from anywhere, anytime.</p>*/}
                        {/*</Carousel.Caption>*/}
                    {/*</Carousel.Item>*/}
                </Carousel>
                </div>
                </div>

                    <div className="container">
                    <div  className="col-sm-8">
                    <UserDetails />
                    </div>
                    </div>

                    <div ><br/>
                        <footer className="footer">
                        <p style={footerText}>MovieCentral ® is a registered Trademark of Freelancer Technology Pty Limited (ACN 142 189 759)

                            Copyright © 2018 MovieCentral Technology Pty Limited (ACN 142 189 759)</p>
                        </footer>
                    </div>
                </div>


            </div>
        );
    }
}

export default withRouter(UserActivity);