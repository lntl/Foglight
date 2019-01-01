import React, { Component } from 'react';


class AdminPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      user_datas:[],
      token:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    fetch('http://localhost:1337/auth/local', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: this.state.email,
        password: this.state.password,
        rememberMe: true
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if(typeof responseJson.error === "undefined"){
        sessionStorage.setItem('user_datas', JSON.stringify(responseJson.user));
        sessionStorage.setItem('token', JSON.stringify(responseJson.jwt));
        this.setState({ token:JSON.stringify(responseJson.jwt), user_datas:JSON.stringify(responseJson.user) });
      }
    })
    e.preventDefault();
  }

  logOut() {
    sessionStorage.clear();
    window.location="";
  }

  componentDidMount() {
    var token = sessionStorage.getItem('token');
    if(token){
      this.setState({ token:token });
      fetch('http://localhost:1337/admin', {
        method: 'GET',
          headers: {
            Authorization: `Bearer ${this.state.jwt}`
        }
      }).then((responseJson) => {
        if(responseJson.status!==200){
          sessionStorage.clear();
          this.setState({ user_datas:'' });
        }
      })
    }
    this.mounted = true;
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    var token = sessionStorage.getItem('token');
    let user_datas = this.state.user_datas;
    user_datas = JSON.parse(sessionStorage.getItem('user_datas'));
    if (token)
      return (
        <div>
          <p>Bonjour {user_datas.username}</p>
          <button onClick={this.logOut}>Logout</button>
        </div>);
      return(
        <form onSubmit={this.handleSubmit} className="foglight-form log">
          <h2>Connexion</h2>
          <input type="text" onChange={this.handleChange} name="email" value={this.state.email || ''}  placeholder="Your name"/>
          <input type="password" onChange={this.handleChange} name="password" value={this.state.password || ''}  placeholder="Your password"/>
          <input type="submit"/>
        </form>);
  }
}

export default AdminPanel



