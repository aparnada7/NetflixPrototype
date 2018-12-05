import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
 import {withRouter} from 'react-router-dom';
import  logo from '../image/netflix-logo.jpg';
import * as API from '../api/index';
import Login from "./login";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DeleteMovie from '../components/deleteMovie';

let imgStyle = {height: '100px', padding: '10px', width: '300px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'right', backgroundColor: '#FEFDFD', padding: '12px', marginTop: '27px', width: '700px'};
let formHead1 = {color:'blue', fontFamily : 'Open Sans', fontSize: '55', fontWeight: 'bold'};
var data = [];

class UpdateMovie extends Component{
  constructor(props){
    super(props);
  }
    state = {
        moviedata: {
            search: '',
            page: 0,
            size: 0
        },
        validation_error: [],
        isLoggedIn: false,
        message: '',
        movieList: [],
        delMovieName : '',
        movieDict : [],
        isUpdateRequested: false,
        movieData: [],
        movieID: "",
        delmessage: ""
    };


    componentWillMount() {
      this.setState({

        // movieList:["Movie ABC1", "Movie cde2", "Movie XYZ3", "Movie DDD4"]
        movieList: [],
        search: '',
        page: 0,
        size: 0,
        delMovieName: '',
        isUpdateRequested: false,
        movieID: "",
        delmessage: ""
      });
      this.state.movieDict.push({
        key:"1",
        value:"1111"
      });
            }

    handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDelMovie(event){
    console.log("Delete movie: ", this.state.delMovieName);
    // console.log("Movie Dict: ", this.state.movieDict)
  }

  handleUpdateMovie(event){
    console.log("Update movie: ");
    this.setState({
      isUpdateRequested: true
    });

    // console.log("Movie Dict: ", this.state.movieDict)
  }

  handleSearch(movieData){
    console.log("Searching for movie : ", movieData);
          // console.log("Searching for : ", this.state.moviedata.search);
                    API.searchMovie(movieData)
                        .then((res) => {
                            // console.log("response:  " , res);
                            if (res.length > 0 ) {
                                console.log(' Success')
                                this.setState({
                                    isLoggedIn: true,
                                    moviedata: res,
                                    movieList: [],
                                    movieData: res
                                });
                                // data = res.data.content;
                                console.log("MovieData : ", this.state.movieData);
                                // this.props.history.push("/updateMovie");
                                data = res;
                                let i = 0;
                                let len = 0;
                                len = data.length;
                                console.log("Movie names before is: ", this.state.movieList);
                                console.log("Suceesfully found movie with details as: ", data);
                                // console.log("Content is as: ", data.content);
                                console.log("Content length is : ",len);
                                for(i =0; i<=data.length -1; i++){
                                  console.log("Movie name : ",  data[i].title)
                                  this.state.movieList.push(data[i].title);
                                }
                                console.log("Movie names after are: ", this.state.movieList);
                                this.props.history.push('/adminAddMovie');
                            } else if (res.status === '401') {
                                console.log("No records");
                                this.setState({
                                    isLoggedIn: true,
                                    message: "No records found..!!",
                                });
                            } else if (res.status === '402') {
                                this.setState({
                                    isLoggedIn: false,
                                    message: "Session Expired..!!",
                                });
                                this.props.history.push('/login');
                            }
                        });


  }

handleDelete = (movieID) => {
  console.log("Handling delete movie with pid",movieID);

  API.deleteMovie(movieID)
    .then((res) => {
        if (res.status === 200) {
            this.setState({
                delmessage: "Movie Deleted successfully!!",
            });

            console.log("In delete movie call.");
            alert("Movie was deleted successfully!!");
            this.props.history.push("/adminAddMovie");
        } else if (!res.status === 200) {
            console.log("in fail");
            this.setState({
                isLoggedIn: false,
                message: "Wrong username or password. Try again..!!"
            });

        }
    });

}

    render(){
      var self = this;
{/*return component for withKeys*/}

Object.keys(this.state.movieData).map(pd => {
  console.log(
    "data is here after search " + this.state.movieData[pd].title
  );
});


const withKeys = this.state.movieList.map((function(item){
                return(
                    <tr value={item}>
                        {/*changed coloumn names as per mongo db column names
                        <td><input type="radio" checked={false}/></td>&nbsp;&nbsp;&nbsp;&nbsp;*/}
                        <td>{item}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <td><Button name="Update Movie" bsStyle="info" class="btn btn-primary ">Update</Button></td>&nbsp;&nbsp;&nbsp;&nbsp;
                        <td><Button name="Delete Movie" bsStyle="info" class="btn btn-primary " data-toggle="modal" data-target="#myDeleteModal"
                        >Delete</Button></td>
                    </tr>
                )
            }))


const withfilter = this.state.movieData &&
              Object.keys(this.state.movieData).map(pd => {
                return (
                  <tr
                    key={this.state.movieData[pd]._id}>
                  <td key={this.state.movieData[pd]._id} >{this.state.movieData[pd].title}</td>

                    <td><Button name="Update Movie" bsStyle="info" key={this.state.movieData[pd]._id} class="btn btn-primary ">Update</Button></td>
                    <td><Button name="Delete Movie" bsStyle="info" key={this.state.movieData[pd]._id} class="btn btn-primary "
                    onClick={() => this.handleDelete(this.state.movieData[pd]._id)} data-toggle="modal" data-target="#myDeleteModal">Delete</Button></td>
                    {/*<td className='ProjectTable-cell' key={this.state.projectData[pd]._id}>*/}
                    {/*<Button bsStyle="danger" bsSize="sm" block*/}
                    {/*onClick={() => this.handleWatch(this.state.projectData[pd]._id)}> Watch </Button>*/}
                    {/*</td>*/}
                  </tr>
                );
              });



        return(
            <div>
            <div className="col-sm-4"> </div>
            <div style={divStyle1} className="col-sm-3">
            {/*<img src={logo} style={imgStyle} alt="logo"/>*/}

            <p style={formHead1}>Search and update Movie details below</p>
            <hr color="#E3E1E1"/>
            <input type="text" className="form-control" placeholder="Search movie"
            onChange={(event) => {
                this.setState({
                    moviedata: {
                        ...this.state.moviedata,
                        search: event.target.value,
                        page: 0,
                        size : 10
                    }
                });
            }}    />

          {/*<input type="text" className="form-control" placeholder="Node ID" value={this.state.updatenodedata.unodeID}
                                                  onChange={(event) => {
                                                      this.setState({
                                                          updatenodedata: {
                                                              ...this.state.updatenodedata,
                                                              unodeID: event.target.value
                                                          }
                                                      });
                                                  }}/>
                                                  <br/>*/}
            <Button name="Search Movie" bsStyle="info" class="btn btn-primary "
            onClick={() => this.handleSearch(this.state.moviedata)}>Search Movie</Button><br/>
            <hr color="#E3E1E1"/>
                <form>
                <p>Below are the movie results from search:</p>
                <hr/>
                <table>
                <tbody>
                  <tr>
                    <td><b>Movie Title</b></td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td><b>Update</b></td>&nbsp;&nbsp;&nbsp;&nbsp;
                    <td><b>Delete</b></td>
                  </tr>
                  {withfilter}

                  </tbody>
                </table>
{/*
                <input type="text" className="form-control" placeholder="Title" value={this.state.userdata.email} readonly="readonly"/> <br/>
                <input type="text" className="form-control" placeholder="Genre" onChange={this.handleInputChange} /><br />
                <input type="number" className="form-control" placeholder="Year" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Studio" onChange={this.handleInputChange} /><br />
                <textarea type="text" className="form-control" placeholder="Short movie synopsis" onChange={this.handleInputChange} /><br />
                <label>Current Image:</label>
                <input type="text" className="form-control" placeholder="current-image.jpg" onChange={this.handleInputChange} /><br />
                <label>Choose another</label>
                <input type="file" className="form-control" placeholder="upload image" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Movie URL" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Actor" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Director" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Country" onChange={this.handleInputChange} /><br />
                <input type="text" className="form-control" placeholder="Rating" onChange={this.handleInputChange} /><br />

                <select className="form-control" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}>
                  <option value="Select">Select option</option>
                  <option value="Free">Free</option>
                  <option value="Subscription">Subscription only</option>
                  <option value="Pay-per-view">Pay-per-view</option>
                  <option value="Paid">Paid</option>
                </select><br />
                <input type="number" className="form-control" placeholder="Price in $" onChange={this.handleInputChange} /><br />
                <Button name="Add Movie" bsStyle="success" class="btn btn-primary " data-toggle="modal" data-target="#myModal">Update Movie</Button><br/>*/}
                    {/*Modal for update movie*/}
                <div class="modal fade" id="myUPdateModal" data-toggle="myUpdateModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Movie features updated successfully!</h4>
                      </div>
                      <div class="modal-body">
                        <p>Users will now be able to view updated features for movie ABC!!</p>
                        <p>Following features updated: </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                    {/*<!-- /.modal-content -->*/}
                  </div>{/*<!-- /.modal-dialog -->*/}
                </div>{/*<!-- /.modal -->*/}

                  {/*Modal for delete movie*/}
                  <div class="modal fade" id="myDeleteModal" data-toggle="myDeleteModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                          <h4 class="modal-title"> Movie deleted succussfully</h4>
                        </div>
                        <div class="modal-body">
                          <p> Selected movie removed from the database!</p>
                        </div>
                        <div class="modal-footer">

                          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                      {/*<!-- /.modal-content -->*/}
                    </div>{/*<!-- /.modal-dialog -->*/}
                  </div>{/*<!-- /.modal -->*/}

                </form>
                </div>
            </div>


        );
    }
  }

export default withRouter(UpdateMovie);
