import React, { Component } from 'react';
import Header from '../components/header';
import AdminPanel from '../components/admin';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      typeof:"evenement",
      title: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    if(event.target.name!==""){
      this.setState({[event.target.name]: event.target.value});
    }
  }
  handleSubmit(event) {

    if(event.target.name!==""){
      this.setState({[event.target.name]: event.target.value});
    }
    console.log(this.state)
    event.preventDefault();
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount(){
    this.mounted = false;
  }
  render() {
    return (
      <div>
        <Header siteTitle="Admin"/>
        <div className="content-site">
          <div className="container">
            <AdminPanel/>

            {/* <form onSubmit={this.handleSubmit} className="foglight-form">
            <h2>Ajouter un {this.state.typeof}</h2>
              <select name="typeof" onChange={this.handleChange}>
                <option value="evenement">Evenements</option>
                <option value="article">Articles</option>
              </select>
              <input type="text" name="title" onChange={this.handleChange} value={this.state.title || ''} placeholder="Title of event" />
              <input type="submit" value="ok"/>
            </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Admin
